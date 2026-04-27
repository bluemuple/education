// Storage adapter for the Maths Game site.
//
// Default mode: localStorage (works offline, no setup).
// Optional mode: Supabase — set window.SUPABASE_CONFIG before this script
// loads (or fill in the constants below) to share data across devices.
// All public functions are async, so callers can await both modes the same way.
//
// Supabase tables expected (all timestamps default to now()):
//   students  (id uuid pk, name text, gender text)
//   games     (id uuid pk, name text, duration_minutes int, slot text)
//                slot ∈ {'game1','game2','custom'}
//   scores    (id uuid pk, student_id uuid, game_id uuid, score int, played_at timestamptz)
//   completions (id uuid pk, student_id uuid, kind text, completed_at timestamptz)
//                kind ∈ {'practice','game1'}

(() => {
  // ---- Optional Supabase config (leave blank for localStorage mode) ----
  const SUPABASE_URL  = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url)  || '';
  const SUPABASE_ANON = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anon) || '';

  const useSupabase = !!(SUPABASE_URL && SUPABASE_ANON && window.supabase);
  let sb = null;
  if (useSupabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  // ---- localStorage helpers ----
  const KEY = 'mg.v1.';
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(KEY+k); return v==null?d:JSON.parse(v); } catch(e){ return d; } },
    set(k, v) { try { localStorage.setItem(KEY+k, JSON.stringify(v)); } catch(e){} },
    del(k)    { try { localStorage.removeItem(KEY+k); } catch(e){} },
  };
  const uid = () => 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);

  // ===================== STUDENTS =====================
  function logErr(where, err) {
    if (err) console.error('[DB:'+where+']', err.message || err, err);
  }
  async function listStudents() {
    if (useSupabase) {
      const { data, error } = await sb.from('students').select('*').order('name');
      logErr('listStudents', error);
      return data || [];
    }
    return ls.get('students', []);
  }
  async function addStudent(name, gender) {
    name = (name||'').trim(); gender = (gender||'').trim();
    if (!name) return null;
    if (useSupabase) {
      const { data, error } = await sb.from('students').insert({ name, gender }).select().single();
      logErr('addStudent', error);
      if (error) alert('Could not add student:\n' + (error.message || error));
      return data;
    }
    const list = ls.get('students', []);
    const stu = { id: uid(), name, gender };
    list.push(stu); ls.set('students', list); return stu;
  }
  async function deleteStudent(id) {
    if (useSupabase) {
      const { error } = await sb.from('students').delete().eq('id', id);
      logErr('deleteStudent', error);
      return;
    }
    ls.set('students', ls.get('students',[]).filter(s => s.id !== id));
    // also drop their completions + scores so the UI stays consistent
    ls.set('scores', ls.get('scores',[]).filter(s => s.student_id !== id));
    ls.set('completions', ls.get('completions',[]).filter(c => c.student_id !== id));
  }

  // ===================== GAMES =====================
  // Built-in slots: 'game1' (Yesterday Me vs Today Me), 'game2' (Me vs the Class).
  // Extra slots: 'custom' (added by teacher via "New Game" button).
  // We always keep one row per built-in slot; teachers just edit duration & name.
  const DEFAULT_GAMES = [
    { slot:'game1',    name:'Yesterday Me vs. Today Me', duration_minutes:2 },
    { slot:'game2',    name:'Me vs. the Class',           duration_minutes:2 },
    // 'practice' is a virtual slot used only as a foreign-key target for
    // recording per-student practice scores. It is filtered out of the
    // teacher's Games tab and the student's Page 2 tiles.
    { slot:'practice', name:'Practice',                    duration_minutes:0 },
  ];
  async function listGames() {
    if (useSupabase) {
      const { data } = await sb.from('games').select('*').order('created_at', { ascending: true });
      const list = data || [];
      // Make sure default slots exist
      for (const g of DEFAULT_GAMES) {
        if (!list.find(x => x.slot === g.slot)) {
          const { data: ins } = await sb.from('games').insert(g).select().single();
          if (ins) list.push(ins);
        }
      }
      return list;
    }
    let list = ls.get('games', null);
    if (!list) {
      list = DEFAULT_GAMES.map(g => ({ id: uid(), ...g }));
      ls.set('games', list);
    } else {
      for (const g of DEFAULT_GAMES) {
        if (!list.find(x => x.slot === g.slot)) list.push({ id: uid(), ...g });
      }
      ls.set('games', list);
    }
    return list;
  }
  async function updateGame(id, patch) {
    if (useSupabase) {
      const { data } = await sb.from('games').update(patch).eq('id', id).select().single();
      return data;
    }
    const list = ls.get('games', []);
    const idx = list.findIndex(g => g.id === id);
    if (idx >= 0) { list[idx] = { ...list[idx], ...patch }; ls.set('games', list); return list[idx]; }
    return null;
  }
  async function addCustomGame(name, duration) {
    const obj = { name: (name||'New Game').trim(), duration_minutes: duration|0, slot:'custom' };
    if (useSupabase) {
      const { data } = await sb.from('games').insert(obj).select().single();
      return data;
    }
    const list = ls.get('games', []);
    const g = { id: uid(), ...obj };
    list.push(g); ls.set('games', list); return g;
  }
  async function deleteGame(id) {
    if (useSupabase) { await sb.from('games').delete().eq('id', id); return; }
    ls.set('games', ls.get('games',[]).filter(g => g.id !== id || ['game1','game2'].includes((g||{}).slot)));
  }

  // ===================== SCORES =====================
  async function recordScore(student_id, game_id, score) {
    const row = { student_id, game_id, score: score|0, played_at: new Date().toISOString() };
    if (useSupabase) {
      const { data } = await sb.from('scores').insert(row).select().single();
      return data;
    }
    const list = ls.get('scores', []);
    const r = { id: uid(), ...row }; list.push(r); ls.set('scores', list); return r;
  }
  async function listScores() {
    if (useSupabase) {
      const { data } = await sb.from('scores').select('*').order('played_at', { ascending: false });
      return data || [];
    }
    return ls.get('scores', []);
  }
  async function listScoresFor(student_id, game_id) {
    const all = await listScores();
    return all.filter(s => s.student_id === student_id && (!game_id || s.game_id === game_id));
  }

  // ===================== COMPLETIONS (practice / game1 unlock) =====================
  async function markCompleted(student_id, kind) {
    const row = { student_id, kind, completed_at: new Date().toISOString() };
    if (useSupabase) {
      // Idempotent insert
      const { data: existing } = await sb.from('completions').select('id').eq('student_id', student_id).eq('kind', kind).maybeSingle();
      if (existing) return existing;
      const { data } = await sb.from('completions').insert(row).select().single();
      return data;
    }
    const list = ls.get('completions', []);
    if (list.find(c => c.student_id === student_id && c.kind === kind)) return null;
    const r = { id: uid(), ...row }; list.push(r); ls.set('completions', list); return r;
  }
  async function hasCompleted(student_id, kind) {
    if (useSupabase) {
      const { data } = await sb.from('completions').select('id').eq('student_id', student_id).eq('kind', kind).limit(1);
      return !!(data && data.length);
    }
    return !!ls.get('completions', []).find(c => c.student_id === student_id && c.kind === kind);
  }

  // ===================== Util =====================
  function exportJSON() {
    return {
      students: ls.get('students',[]),
      games:    ls.get('games',[]),
      scores:   ls.get('scores',[]),
      completions: ls.get('completions',[]),
    };
  }
  function importJSON(blob) {
    if (!blob || typeof blob !== 'object') return;
    if (Array.isArray(blob.students))    ls.set('students',    blob.students);
    if (Array.isArray(blob.games))       ls.set('games',       blob.games);
    if (Array.isArray(blob.scores))      ls.set('scores',      blob.scores);
    if (Array.isArray(blob.completions)) ls.set('completions', blob.completions);
  }
  function clearAll() {
    ['students','games','scores','completions'].forEach(k => ls.del(k));
  }

  window.DB = {
    mode: useSupabase ? 'supabase' : 'local',
    listStudents, addStudent, deleteStudent,
    listGames, updateGame, addCustomGame, deleteGame,
    recordScore, listScores, listScoresFor,
    markCompleted, hasCompleted,
    exportJSON, importJSON, clearAll,
  };
})();
