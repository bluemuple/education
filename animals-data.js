// Default animal data. Admin edits are layered on top via localStorage.
const ANIMAL_CATEGORIES = [
  { id: "nz",      name: "New Zealand Native",  emoji: "🥝", color: "#A8E6CF" },
  { id: "marine",  name: "Ocean Animals",       emoji: "🌊", color: "#A0D8EF" },
  { id: "mammals", name: "Wild Mammals",        emoji: "🦁", color: "#FFD3B6" },
  { id: "birds",   name: "Birds",               emoji: "🐦", color: "#FFAAA5" },
  { id: "reptiles",name: "Reptiles & Amphibians", emoji: "🦎", color: "#D5E8B5" },
  { id: "bugs",    name: "Insects & Bugs",      emoji: "🐝", color: "#E0BBE4" },
  { id: "farm",    name: "Farm Animals",        emoji: "🐄", color: "#FFE5B4" },
  { id: "pets",    name: "Pets",                emoji: "🐶", color: "#FFC8DD" }
];

const ANIMALS = [
  // ===== NEW ZEALAND NATIVE (15) =====
  { id: "kiwi", name: "Kiwi", emoji: "🥝", category: "nz",
    habitat: "Forests and shrublands of New Zealand.",
    diet: "Insects, worms, seeds and fruit. They are omnivores.",
    funFacts: [
      "The kiwi is a flightless bird and a symbol of New Zealand!",
      "Kiwi lay the biggest egg compared to their body size of any bird.",
      "They have a great sense of smell — rare for birds.",
      "Kiwi are nocturnal, meaning they come out at night."
    ]
  },
  { id: "tuatara", name: "Tuatara", emoji: "🦎", category: "nz",
    habitat: "Coastal forests on small offshore islands of NZ.",
    diet: "Insects, spiders, small lizards and bird eggs.",
    funFacts: [
      "Tuatara are not lizards — they are the only living members of an ancient reptile group.",
      "They can live for more than 100 years!",
      "Tuatara have a 'third eye' on top of their head, sensitive to light.",
      "They lived alongside the dinosaurs over 200 million years ago."
    ]
  },
  { id: "kea", name: "Kea", emoji: "🦜", category: "nz",
    habitat: "Mountains and forests of the South Island, NZ.",
    diet: "Plants, berries, insects, and sometimes meat.",
    funFacts: [
      "Kea are the world's only alpine parrot.",
      "They are super smart and love solving puzzles.",
      "Kea are famous for being cheeky — they sometimes pull rubber off cars!",
      "Their feathers are olive-green with bright orange under the wings."
    ]
  },
  { id: "takahe", name: "Takahē", emoji: "🐦", category: "nz",
    habitat: "Alpine grasslands of Fiordland, NZ.",
    diet: "Tussock grasses, leaves and insects.",
    funFacts: [
      "Takahē were once thought to be extinct, but rediscovered in 1948!",
      "They are flightless birds with shiny blue and green feathers.",
      "They have a big red beak strong enough to crush tough grass.",
      "Conservation programs are slowly bringing their numbers back."
    ]
  },
  { id: "kakapo", name: "Kākāpō", emoji: "🦜", category: "nz",
    habitat: "Predator-free islands of New Zealand.",
    diet: "Fruits, seeds, leaves and bark.",
    funFacts: [
      "Kākāpō are the world's heaviest parrot — and they can't fly!",
      "They are nocturnal and smell a bit like honey.",
      "Each kākāpō has its own name and is carefully looked after by rangers.",
      "There are only around 250 left in the whole world."
    ]
  },
  { id: "pukeko", name: "Pūkeko", emoji: "🐦", category: "nz",
    habitat: "Wetlands, swamps and grasslands in NZ.",
    diet: "Plants, seeds, frogs, insects and small birds.",
    funFacts: [
      "Pūkeko have bright blue feathers and a red beak.",
      "They live in groups and help raise each other's chicks.",
      "They can swim, but they prefer walking.",
      "Pūkeko are very loud and chatty birds!"
    ]
  },
  { id: "weka", name: "Weka", emoji: "🐦", category: "nz",
    habitat: "Forests, scrub and coastal areas in NZ.",
    diet: "Insects, fruit, lizards, eggs — almost anything!",
    funFacts: [
      "Weka are flightless brown birds the size of a chicken.",
      "They are very curious and sometimes steal shiny objects from campsites!",
      "Weka can swim if they need to cross water.",
      "Their loud 'coo-eet' call is often heard at dawn and dusk."
    ]
  },
  { id: "fantail", name: "Pīwakawaka (Fantail)", emoji: "🐦", category: "nz",
    habitat: "Forests, parks and gardens across NZ.",
    diet: "Small flying insects.",
    funFacts: [
      "Fantails have a fan-shaped tail they spread wide while flying.",
      "They often follow people in the forest to catch insects stirred up by footsteps.",
      "In Māori legend, the fantail is connected to the story of Maui.",
      "They are tiny — only about 16cm long including the tail!"
    ]
  },
  { id: "tui", name: "Tūī", emoji: "🐦", category: "nz",
    habitat: "Native forests and gardens with flowering trees.",
    diet: "Nectar, fruit and insects.",
    funFacts: [
      "Tūī have a tuft of white feathers on their throat that looks like a tiny bow tie.",
      "They are amazing mimics and can copy other birds and even human words.",
      "Their songs include clicks, whistles and gurgles.",
      "Tūī help pollinate flowers as they drink nectar."
    ]
  },
  { id: "bellbird", name: "Korimako (Bellbird)", emoji: "🐦", category: "nz",
    habitat: "Native forests of New Zealand.",
    diet: "Nectar, fruit and insects.",
    funFacts: [
      "The bellbird's song sounds like beautiful tiny bells ringing.",
      "Captain Cook said their dawn chorus was 'most melodious wild music'.",
      "They are olive-green with a curved tongue for sipping nectar.",
      "They are important pollinators of native NZ flowers."
    ]
  },
  { id: "hector-dolphin", name: "Hector's Dolphin", emoji: "🐬", category: "nz",
    habitat: "Shallow coastal waters around NZ.",
    diet: "Small fish and squid.",
    funFacts: [
      "Hector's dolphins are one of the smallest dolphins in the world.",
      "They have a rounded dorsal fin shaped like a Mickey Mouse ear.",
      "They live only in New Zealand waters.",
      "They are an endangered species and very rare to see."
    ]
  },
  { id: "hoiho", name: "Hoiho (Yellow-eyed Penguin)", emoji: "🐧", category: "nz",
    habitat: "Coastal forests of southern NZ.",
    diet: "Fish and squid.",
    funFacts: [
      "Hoiho means 'noise shouter' in Māori — because of their loud call.",
      "They have bright yellow eyes and a yellow band across their head.",
      "They are one of the rarest penguins in the world.",
      "Hoiho can dive up to 120 metres deep to catch fish."
    ]
  },
  { id: "nz-sealion", name: "NZ Sea Lion", emoji: "🦭", category: "nz",
    habitat: "Beaches and coasts of southern NZ.",
    diet: "Fish, squid, octopus and small penguins.",
    funFacts: [
      "NZ sea lions can weigh as much as 400kg — that's heavier than a fridge!",
      "Males have a thick dark mane, like a lion.",
      "They are one of the rarest sea lions in the world.",
      "Pups are born with dark brown fur and grow up to be paler."
    ]
  },
  { id: "weta", name: "Wētā", emoji: "🦗", category: "nz",
    habitat: "Forests, caves and gardens of NZ.",
    diet: "Leaves, flowers, fruit and other insects.",
    funFacts: [
      "Wētā are giant insects — some are heavier than a mouse!",
      "They have lived in NZ for over 100 million years.",
      "Wētā can freeze solid in winter and thaw out alive in spring.",
      "Their name comes from the Māori word 'wētāpunga' meaning 'god of ugly things'."
    ]
  },
  { id: "morepork", name: "Ruru (Morepork)", emoji: "🦉", category: "nz",
    habitat: "Forests and parks throughout NZ.",
    diet: "Insects, small birds, mice and lizards.",
    funFacts: [
      "Their name comes from their call: 'more-pork! more-pork!'",
      "Ruru are New Zealand's only native owl.",
      "They hunt at night using huge yellow eyes.",
      "In Māori tradition, the ruru is a guardian spirit."
    ]
  },

  // ===== OCEAN ANIMALS (15) =====
  { id: "dolphin", name: "Dolphin", emoji: "🐬", category: "marine",
    habitat: "Oceans and seas around the world.",
    diet: "Fish and squid.",
    funFacts: [
      "Dolphins are super smart and can solve puzzles.",
      "They sleep with one eye open and half their brain awake!",
      "Each dolphin has its own whistle, like a name.",
      "They love to play and surf on waves."
    ]
  },
  { id: "shark", name: "Great White Shark", emoji: "🦈", category: "marine",
    habitat: "Coastal waters in oceans around the world.",
    diet: "Fish, seals and sea lions.",
    funFacts: [
      "Great whites can grow up to 6 metres long!",
      "They have around 300 teeth in rows — and grow new ones their whole life.",
      "Sharks can smell a single drop of blood in an Olympic pool.",
      "Despite their reputation, attacks on humans are very rare."
    ]
  },
  { id: "whale", name: "Humpback Whale", emoji: "🐋", category: "marine",
    habitat: "Oceans all around the world.",
    diet: "Tiny krill and small fish.",
    funFacts: [
      "Humpbacks sing long songs that travel huge distances underwater.",
      "They can leap their entire body out of the water — called 'breaching'.",
      "An adult humpback is about the size of a school bus.",
      "They migrate up to 8,000 km every year."
    ]
  },
  { id: "octopus", name: "Octopus", emoji: "🐙", category: "marine",
    habitat: "Oceans worldwide, often hiding in rocks and reefs.",
    diet: "Crabs, fish and shrimp.",
    funFacts: [
      "Octopuses have three hearts and blue blood!",
      "They can change colour and texture to camouflage instantly.",
      "Each arm has its own 'mini brain' for tasting and moving.",
      "Some octopuses can squeeze through holes the size of a coin."
    ]
  },
  { id: "sea-turtle", name: "Sea Turtle", emoji: "🐢", category: "marine",
    habitat: "Warm oceans and seas around the world.",
    diet: "Jellyfish, seagrass, algae and crabs.",
    funFacts: [
      "Sea turtles can live for over 100 years.",
      "They return to the same beach they were born to lay eggs.",
      "They cry salty 'tears' to get rid of extra salt.",
      "Baby turtles use the moon to find their way to the ocean."
    ]
  },
  { id: "jellyfish", name: "Jellyfish", emoji: "🪼", category: "marine",
    habitat: "All oceans, from surface to deep sea.",
    diet: "Tiny plankton, small fish and shrimp.",
    funFacts: [
      "Jellyfish are 95% water!",
      "They have no brain, no heart and no bones.",
      "Some jellyfish glow in the dark.",
      "They have been around for over 500 million years — older than dinosaurs!"
    ]
  },
  { id: "seahorse", name: "Seahorse", emoji: "🐴", category: "marine",
    habitat: "Shallow seagrass beds, coral reefs and mangroves.",
    diet: "Tiny shrimp and plankton.",
    funFacts: [
      "Seahorses are the only animals where the dad gives birth to the babies!",
      "They swim upright by fluttering tiny fins.",
      "Their eyes can look in two different directions at once.",
      "Seahorses can change colour to match their surroundings."
    ]
  },
  { id: "starfish", name: "Starfish", emoji: "⭐", category: "marine",
    habitat: "Tide pools, reefs and the deep sea.",
    diet: "Clams, mussels, snails and small fish.",
    funFacts: [
      "Starfish can grow a new arm if they lose one!",
      "They have no brain and no blood — they pump sea water instead.",
      "Most starfish have 5 arms, but some have up to 40!",
      "They eat by pushing their stomach out of their mouth — yuck!"
    ]
  },
  { id: "crab", name: "Crab", emoji: "🦀", category: "marine",
    habitat: "Oceans, beaches and even some rivers.",
    diet: "Algae, worms, fish and other small animals.",
    funFacts: [
      "Crabs walk sideways because of how their legs bend.",
      "They have 10 legs in total — including their pincers.",
      "Crabs can taste with their feet.",
      "Some crabs can live for over 30 years."
    ]
  },
  { id: "lobster", name: "Lobster", emoji: "🦞", category: "marine",
    habitat: "Cold, rocky ocean floors.",
    diet: "Fish, clams, snails and seaweed.",
    funFacts: [
      "Lobsters can live for over 50 years!",
      "Their blood is light blue.",
      "They have teeth — in their stomach!",
      "Some rare lobsters are blue, yellow, or even split in colour down the middle."
    ]
  },
  { id: "stingray", name: "Stingray", emoji: "🐟", category: "marine",
    habitat: "Warm shallow seas and rivers.",
    diet: "Fish, crabs, clams and shrimp.",
    funFacts: [
      "Stingrays glide through the water like underwater pancakes.",
      "Most rays have a sharp stinger on their tail for protection.",
      "They are related to sharks!",
      "Some can grow as wide as 2 metres."
    ]
  },
  { id: "clownfish", name: "Clownfish", emoji: "🐠", category: "marine",
    habitat: "Coral reefs in warm oceans.",
    diet: "Algae, plankton and tiny shrimp.",
    funFacts: [
      "Clownfish live safely inside stinging sea anemones — the stings don't hurt them.",
      "They are bright orange with white stripes.",
      "All clownfish are born male, but the biggest one becomes female!",
      "Made famous by the movie 'Finding Nemo'."
    ]
  },
  { id: "orca", name: "Orca (Killer Whale)", emoji: "🐳", category: "marine",
    habitat: "All oceans, especially cold waters.",
    diet: "Fish, seals, squid and sometimes other whales.",
    funFacts: [
      "Orcas are actually the largest type of dolphin!",
      "They live in family groups called 'pods'.",
      "Each pod has its own unique 'language' of clicks and calls.",
      "Orcas can swim up to 56 km/h."
    ]
  },
  { id: "seal", name: "Seal", emoji: "🦭", category: "marine",
    habitat: "Coasts and oceans around the world.",
    diet: "Fish, squid and crustaceans.",
    funFacts: [
      "Seals can hold their breath for over 30 minutes underwater.",
      "They have whiskers to feel the movement of fish.",
      "Baby seals are called 'pups' and can swim almost from birth.",
      "Seals slide on their bellies on land — it's faster than walking."
    ]
  },
  { id: "manta-ray", name: "Manta Ray", emoji: "🐟", category: "marine",
    habitat: "Tropical oceans around the world.",
    diet: "Tiny plankton and small fish.",
    funFacts: [
      "Manta rays can have wings up to 7 metres wide!",
      "They are gentle giants — totally harmless to people.",
      "Manta rays sometimes do somersaults while feeding.",
      "They have the biggest brain of any fish."
    ]
  },

  // ===== WILD MAMMALS (20) =====
  { id: "lion", name: "Lion", emoji: "🦁", category: "mammals",
    habitat: "Grasslands and savannas of Africa.",
    diet: "Zebras, antelopes and other large animals.",
    funFacts: [
      "A lion's roar can be heard from 8 km away.",
      "Lions are the only cats that live in groups, called prides.",
      "A male lion's mane gets darker with age — and females actually prefer darker manes.",
      "Lions sleep up to 20 hours a day to save energy for hunting.",
      "Female lions do almost all the hunting — usually in teams."
    ]
  },
  { id: "tiger", name: "Tiger", emoji: "🐯", category: "mammals",
    habitat: "Forests and grasslands of Asia.",
    diet: "Deer, wild boar and other animals.",
    funFacts: [
      "Tigers are the largest cats in the world.",
      "Every tiger has a unique stripe pattern, like a fingerprint.",
      "They love water and are great swimmers.",
      "Tigers can leap up to 10 metres in one jump!"
    ]
  },
  { id: "elephant", name: "Elephant", emoji: "🐘", category: "mammals",
    habitat: "Savannas, forests and deserts in Africa and Asia.",
    diet: "Grass, leaves, bark and fruit.",
    funFacts: [
      "Elephants are the biggest land animals on Earth.",
      "Their trunks have over 40,000 muscles.",
      "They greet each other with their trunks, like a handshake.",
      "Elephants can remember other elephants for many years."
    ]
  },
  { id: "giraffe", name: "Giraffe", emoji: "🦒", category: "mammals",
    habitat: "African savannas.",
    diet: "Leaves, especially from acacia trees.",
    funFacts: [
      "Giraffes are the tallest animals on Earth — up to 5.5m tall!",
      "Their tongues are dark blue-purple and 50cm long.",
      "They have the same number of neck bones as humans — 7.",
      "Baby giraffes are born by dropping 2 metres to the ground!"
    ]
  },
  { id: "zebra", name: "Zebra", emoji: "🦓", category: "mammals",
    habitat: "African plains and grasslands.",
    diet: "Grass, leaves and bark.",
    funFacts: [
      "Every zebra has a unique stripe pattern.",
      "Scientists think stripes help confuse predators and biting flies.",
      "Zebras live in herds and protect each other.",
      "They sleep standing up!"
    ]
  },
  { id: "monkey", name: "Monkey", emoji: "🐒", category: "mammals",
    habitat: "Forests and jungles around the world.",
    diet: "Fruit, leaves, insects and nuts.",
    funFacts: [
      "Most monkeys have tails — apes don't.",
      "Some monkeys use sticks and stones as tools.",
      "Monkeys can make loud calls to warn others of danger.",
      "Spider monkeys swing through trees using their tail like a fifth hand."
    ]
  },
  { id: "gorilla", name: "Gorilla", emoji: "🦍", category: "mammals",
    habitat: "Forests of central Africa.",
    diet: "Leaves, fruit, stems and bamboo.",
    funFacts: [
      "Gorillas are the biggest primates in the world.",
      "They share about 98% of their DNA with humans!",
      "Adult male gorillas are called 'silverbacks' because of their silver fur.",
      "Gorillas can make 25 different sounds to talk to each other."
    ]
  },
  { id: "panda", name: "Panda", emoji: "🐼", category: "mammals",
    habitat: "Mountain forests of central China.",
    diet: "Almost only bamboo!",
    funFacts: [
      "Pandas eat bamboo for up to 14 hours a day.",
      "Baby pandas are pink, hairless and the size of a stick of butter!",
      "They have an extra 'thumb' bone to help grip bamboo.",
      "Pandas are great climbers and can swim."
    ]
  },
  { id: "polar-bear", name: "Polar Bear", emoji: "🐻‍❄️", category: "mammals",
    habitat: "Sea ice and coasts of the Arctic.",
    diet: "Seals, fish and sometimes berries.",
    funFacts: [
      "Polar bears have black skin under their white fur!",
      "Their fur is actually see-through, not white.",
      "They are amazing swimmers — they can swim for hours.",
      "Polar bears can smell a seal from 1.6 km away."
    ]
  },
  { id: "kangaroo", name: "Kangaroo", emoji: "🦘", category: "mammals",
    habitat: "Grasslands and forests of Australia.",
    diet: "Grass, leaves and shrubs.",
    funFacts: [
      "Kangaroos can hop over 9 metres in one jump!",
      "Baby kangaroos are called joeys.",
      "Joeys live in their mum's pouch for about 6 months.",
      "Kangaroos can't walk backwards."
    ]
  },
  { id: "koala", name: "Koala", emoji: "🐨", category: "mammals",
    habitat: "Eucalyptus forests of Australia.",
    diet: "Eucalyptus leaves (almost only these!).",
    funFacts: [
      "Koalas sleep up to 20 hours a day!",
      "They are not bears — they are marsupials, like kangaroos.",
      "Each koala has a unique fingerprint, similar to humans.",
      "Baby koalas are called joeys, just like kangaroos."
    ]
  },
  { id: "wolf", name: "Wolf", emoji: "🐺", category: "mammals",
    habitat: "Forests, tundra and mountains across the world.",
    diet: "Deer, elk, rabbits and small animals.",
    funFacts: [
      "Wolves live in family groups called packs.",
      "A wolf howl can be heard from 10 km away.",
      "Wolves have a great sense of smell, much stronger than dogs.",
      "Pups are born with blue eyes that later turn yellow."
    ]
  },
  { id: "fox", name: "Fox", emoji: "🦊", category: "mammals",
    habitat: "Forests, fields and even cities around the world.",
    diet: "Small animals, fruit, insects and scraps.",
    funFacts: [
      "Foxes are part of the dog family but act a bit like cats.",
      "Their bushy tail keeps them warm in winter.",
      "Foxes can hear a watch ticking from 36 metres away.",
      "Baby foxes are called kits."
    ]
  },
  { id: "bear", name: "Brown Bear", emoji: "🐻", category: "mammals",
    habitat: "Forests and mountains of North America, Europe and Asia.",
    diet: "Berries, fish, nuts, plants and small animals.",
    funFacts: [
      "Bears can run as fast as 56 km/h.",
      "They hibernate for the whole winter — months without food!",
      "A bear's nose is much more sensitive than a dog's.",
      "They can stand on two legs to see further."
    ]
  },
  { id: "cheetah", name: "Cheetah", emoji: "🐆", category: "mammals",
    habitat: "African savannas and grasslands.",
    diet: "Gazelles, impalas and other fast prey.",
    funFacts: [
      "Cheetahs are the fastest land animals — up to 120 km/h!",
      "They can go from 0 to 100 km/h in 3 seconds.",
      "Cheetahs cannot roar — they purr like a house cat.",
      "Their tear-shaped face markings cut down sun glare."
    ]
  },
  { id: "leopard", name: "Leopard", emoji: "🐆", category: "mammals",
    habitat: "Forests, savannas and mountains of Africa and Asia.",
    diet: "Antelopes, monkeys, birds and rodents.",
    funFacts: [
      "Leopards are amazing climbers and often rest in trees.",
      "They can drag prey twice their weight up a tree.",
      "Their spots are called 'rosettes'.",
      "Black panthers are actually leopards with dark fur!"
    ]
  },
  { id: "hippo", name: "Hippopotamus", emoji: "🦛", category: "mammals",
    habitat: "Rivers and lakes in Africa.",
    diet: "Grass and water plants.",
    funFacts: [
      "Hippos spend most of the day in water to stay cool.",
      "Their sweat is pink and works like sunscreen.",
      "Hippos can't actually swim — they walk along the river bottom.",
      "They are one of the most dangerous large animals in Africa."
    ]
  },
  { id: "rhino", name: "Rhinoceros", emoji: "🦏", category: "mammals",
    habitat: "Grasslands and forests in Africa and Asia.",
    diet: "Grass, leaves and shoots.",
    funFacts: [
      "Rhino horns are made of keratin — the same stuff as your fingernails.",
      "Rhinos can charge at 50 km/h.",
      "They love to roll in mud — it's their sunscreen and bug spray.",
      "There are five species of rhino in the world."
    ]
  },
  { id: "camel", name: "Camel", emoji: "🐪", category: "mammals",
    habitat: "Deserts of Africa, Asia and the Middle East.",
    diet: "Grass, leaves, thorny plants and seeds.",
    funFacts: [
      "Camels store fat in their humps — not water!",
      "They can go a whole week without drinking water.",
      "Three layers of eyelashes protect their eyes from sand.",
      "Their feet are wide and padded for walking on sand."
    ]
  },
  { id: "sloth", name: "Sloth", emoji: "🦥", category: "mammals",
    habitat: "Rainforests of Central and South America.",
    diet: "Leaves, twigs and fruit.",
    funFacts: [
      "Sloths are the slowest mammals on Earth.",
      "They only come down from trees once a week — to go to the toilet!",
      "Algae grow on their fur, helping them camouflage as green.",
      "Sloths can hold their breath underwater for 40 minutes."
    ]
  },

  // ===== BIRDS (15) =====
  { id: "eagle", name: "Eagle", emoji: "🦅", category: "birds",
    habitat: "Mountains, forests and coasts worldwide.",
    diet: "Fish, rabbits, snakes and small mammals.",
    funFacts: [
      "Eagles have amazing eyesight — up to 8 times sharper than humans.",
      "They can spot prey from over 3 km away.",
      "Bald eagles aren't really bald — they have white feathers on their head.",
      "Eagles build huge nests called eyries, sometimes used for years."
    ]
  },
  { id: "owl", name: "Owl", emoji: "🦉", category: "birds",
    habitat: "Forests, fields and deserts around the world.",
    diet: "Mice, insects, small birds and frogs.",
    funFacts: [
      "Owls can turn their heads 270 degrees!",
      "Their feathers are designed to fly almost silently.",
      "Owls have huge eyes that can't move — that's why they turn their heads.",
      "A group of owls is called a 'parliament'."
    ]
  },
  { id: "penguin", name: "Emperor Penguin", emoji: "🐧", category: "birds",
    habitat: "Antarctica and cold southern oceans.",
    diet: "Fish, squid and krill.",
    funFacts: [
      "Emperor penguins are the tallest penguins — up to 1.2m!",
      "Dads keep the egg warm on their feet for 2 months.",
      "They huddle in big groups to stay warm in -50°C cold.",
      "Penguins can dive over 500 metres deep."
    ]
  },
  { id: "parrot", name: "Parrot", emoji: "🦜", category: "birds",
    habitat: "Tropical forests around the world.",
    diet: "Seeds, fruit, nuts and flowers.",
    funFacts: [
      "Some parrots can learn hundreds of human words.",
      "Parrots can live for 60–80 years!",
      "Their feet have two toes pointing forward and two backward.",
      "Macaws are the largest parrots, with very colourful feathers."
    ]
  },
  { id: "flamingo", name: "Flamingo", emoji: "🦩", category: "birds",
    habitat: "Salty lakes and lagoons in warm areas.",
    diet: "Algae, shrimp and small water animals.",
    funFacts: [
      "Flamingos are pink because of the food they eat!",
      "They stand on one leg to keep their body warm.",
      "Flamingos eat with their head upside down.",
      "Babies are born grey or white and turn pink over time."
    ]
  },
  { id: "peacock", name: "Peacock", emoji: "🦚", category: "birds",
    habitat: "Forests and grasslands in India and Sri Lanka.",
    diet: "Seeds, insects, small reptiles and plants.",
    funFacts: [
      "Only male peacocks have the famous big tail feathers.",
      "Their feathers can shimmer green, blue and gold.",
      "They show off their feathers to impress females.",
      "Females are called peahens."
    ]
  },
  { id: "hummingbird", name: "Hummingbird", emoji: "🐦", category: "birds",
    habitat: "The Americas, especially tropical areas.",
    diet: "Flower nectar and tiny insects.",
    funFacts: [
      "Hummingbirds can flap their wings 80 times per second!",
      "They are the only birds that can fly backwards.",
      "Their heart beats over 1,200 times a minute.",
      "Some hummingbirds are tiny — only 5cm long."
    ]
  },
  { id: "toucan", name: "Toucan", emoji: "🦜", category: "birds",
    habitat: "Rainforests of Central and South America.",
    diet: "Fruit, insects, lizards and eggs.",
    funFacts: [
      "Toucans have huge colourful beaks that are very light.",
      "Their beak helps them stay cool by releasing heat.",
      "They sleep with their beak tucked under their wing.",
      "Toucans live in family groups in tree holes."
    ]
  },
  { id: "pelican", name: "Pelican", emoji: "🐦", category: "birds",
    habitat: "Coasts, lakes and rivers around the world.",
    diet: "Mostly fish.",
    funFacts: [
      "Pelicans use their big throat pouch like a fishing net.",
      "Their pouch can hold 3 times more than their stomach.",
      "They often hunt in groups, herding fish together.",
      "Pelicans have hollow bones to help them float."
    ]
  },
  { id: "swan", name: "Swan", emoji: "🦢", category: "birds",
    habitat: "Lakes, rivers and ponds around the world.",
    diet: "Water plants, insects and small fish.",
    funFacts: [
      "Swans pair up with one partner for life.",
      "They have over 25,000 feathers on their body.",
      "Baby swans are called cygnets.",
      "Swans can fly very fast — up to 95 km/h."
    ]
  },
  { id: "duck", name: "Duck", emoji: "🦆", category: "birds",
    habitat: "Ponds, rivers and lakes everywhere.",
    diet: "Plants, insects, fish and seeds.",
    funFacts: [
      "Ducks have waterproof feathers thanks to a special oil.",
      "They can sleep with one eye open to watch for danger.",
      "Baby ducks (ducklings) can swim almost from birth.",
      "A duck's quack actually does echo — that's a myth busted!"
    ]
  },
  { id: "ostrich", name: "Ostrich", emoji: "🦢", category: "birds",
    habitat: "Savannas and deserts of Africa.",
    diet: "Plants, seeds, insects and small animals.",
    funFacts: [
      "Ostriches are the biggest birds — up to 2.7m tall!",
      "They can't fly, but they can run at 70 km/h.",
      "Ostrich eggs are the biggest eggs in the world.",
      "Their eyes are bigger than their brain!"
    ]
  },
  { id: "woodpecker", name: "Woodpecker", emoji: "🐦", category: "birds",
    habitat: "Forests around the world.",
    diet: "Insects under tree bark, sap and nuts.",
    funFacts: [
      "Woodpeckers can peck 20 times per second.",
      "Their skull has special padding to protect their brain.",
      "Their tongue can wrap around their head!",
      "They drum on trees to send messages to other woodpeckers."
    ]
  },
  { id: "robin", name: "Robin", emoji: "🐦", category: "birds",
    habitat: "Gardens, parks and forests.",
    diet: "Worms, insects, berries and fruit.",
    funFacts: [
      "Robins are friendly and often visit gardens.",
      "They are famous for their bright red or orange chest.",
      "Robins sing both during the day and sometimes at night.",
      "Baby robins are spotty brown, not red."
    ]
  },
  { id: "seagull", name: "Seagull", emoji: "🐦", category: "birds",
    habitat: "Coasts, harbours and cities near the sea.",
    diet: "Fish, crabs, scraps — almost anything.",
    funFacts: [
      "Seagulls can drink salty seawater.",
      "They are very smart and can use tools.",
      "Seagulls stamp their feet to trick worms into coming up.",
      "They have been seen stealing chips right out of people's hands!"
    ]
  },

  // ===== REPTILES & AMPHIBIANS (10) =====
  { id: "crocodile", name: "Crocodile", emoji: "🐊", category: "reptiles",
    habitat: "Rivers, lakes and wetlands in warm areas.",
    diet: "Fish, birds, and large animals.",
    funFacts: [
      "Crocodiles have been around since the time of dinosaurs.",
      "Their bite is the strongest of any animal — but their jaws are weak when opening!",
      "They can grow over 100 new teeth in their lifetime.",
      "Crocodiles can hold their breath underwater for over 1 hour."
    ]
  },
  { id: "snake", name: "Python", emoji: "🐍", category: "reptiles",
    habitat: "Forests, swamps and grasslands in Asia, Africa and Australia.",
    diet: "Birds, small mammals and lizards.",
    funFacts: [
      "Pythons squeeze their prey instead of using venom.",
      "They can unhinge their jaw to swallow prey bigger than their head.",
      "Some pythons grow over 6 metres long!",
      "Snakes smell with their tongue."
    ]
  },
  { id: "gecko", name: "Gecko", emoji: "🦎", category: "reptiles",
    habitat: "Warm areas around the world, even on walls in houses!",
    diet: "Insects and spiders.",
    funFacts: [
      "Geckos have sticky toe pads and can climb glass!",
      "They can drop their tail to escape predators — and grow a new one.",
      "Most geckos are nocturnal.",
      "Some geckos make little chirping sounds."
    ]
  },
  { id: "chameleon", name: "Chameleon", emoji: "🦎", category: "reptiles",
    habitat: "Forests of Africa, Madagascar and Asia.",
    diet: "Insects, especially flies and grasshoppers.",
    funFacts: [
      "Chameleons change colour to show mood — not just camouflage!",
      "Their tongue can be twice as long as their body.",
      "Each eye moves independently — they can look two ways at once.",
      "Their feet are shaped like little tongs for gripping branches."
    ]
  },
  { id: "frog", name: "Frog", emoji: "🐸", category: "reptiles",
    habitat: "Ponds, rivers and forests around the world.",
    diet: "Insects, worms and small animals.",
    funFacts: [
      "Frogs can breathe through their skin!",
      "Some frogs can jump 20 times their body length.",
      "Frogs swallow with their eyes — they pull them down to push food.",
      "Baby frogs are called tadpoles and live in water first."
    ]
  },
  { id: "toad", name: "Toad", emoji: "🐸", category: "reptiles",
    habitat: "Damp places, gardens and forests.",
    diet: "Insects, snails and worms.",
    funFacts: [
      "Toads have bumpy, dry skin — frogs are smooth and wet.",
      "Toads can live for over 10 years.",
      "Some toads puff up to look bigger when scared.",
      "They are great at controlling garden pests."
    ]
  },
  { id: "turtle", name: "Turtle", emoji: "🐢", category: "reptiles",
    habitat: "Ponds, rivers, oceans and land worldwide.",
    diet: "Plants, fish, insects — depends on species.",
    funFacts: [
      "A turtle's shell is part of its skeleton.",
      "Some turtles can live for over 150 years.",
      "Turtles have been around for over 200 million years.",
      "They have no teeth — they use a beak instead."
    ]
  },
  { id: "iguana", name: "Iguana", emoji: "🦎", category: "reptiles",
    habitat: "Forests near rivers in Central and South America.",
    diet: "Leaves, fruit and flowers (they're herbivores).",
    funFacts: [
      "Iguanas have a 'third eye' on top of their head that senses light.",
      "They can drop from high trees without getting hurt.",
      "Iguanas are great swimmers.",
      "Their spiky back makes them look like little dragons!"
    ]
  },
  { id: "salamander", name: "Salamander", emoji: "🦎", category: "reptiles",
    habitat: "Damp forests, streams and ponds.",
    diet: "Insects, worms and small fish.",
    funFacts: [
      "Salamanders can regrow lost legs, tails, and even parts of their heart!",
      "They breathe through their skin.",
      "Some salamanders glow in the dark.",
      "They are amphibians, like frogs — not reptiles."
    ]
  },
  { id: "komodo", name: "Komodo Dragon", emoji: "🦎", category: "reptiles",
    habitat: "A few islands in Indonesia.",
    diet: "Deer, pigs, water buffalo and other large animals.",
    funFacts: [
      "Komodo dragons are the world's biggest lizards.",
      "They have a venomous bite that weakens their prey.",
      "Their forked tongue helps them smell food kilometres away.",
      "They can run as fast as 20 km/h."
    ]
  },

  // ===== INSECTS & BUGS (10) =====
  { id: "butterfly", name: "Butterfly", emoji: "🦋", category: "bugs",
    habitat: "Gardens, fields and forests worldwide.",
    diet: "Flower nectar.",
    funFacts: [
      "Butterflies taste with their feet!",
      "They start life as caterpillars before transforming.",
      "Butterfly wings are covered in tiny scales.",
      "The monarch butterfly migrates thousands of kilometres."
    ]
  },
  { id: "bee", name: "Honey Bee", emoji: "🐝", category: "bugs",
    habitat: "Hives in trees and bee boxes around the world.",
    diet: "Nectar and pollen from flowers.",
    funFacts: [
      "Bees do a 'waggle dance' to tell others where flowers are.",
      "A bee makes only a tiny drop of honey in its whole life.",
      "Bees have 5 eyes!",
      "Without bees, many of our fruits and veggies wouldn't grow."
    ]
  },
  { id: "ladybug", name: "Ladybug", emoji: "🐞", category: "bugs",
    habitat: "Gardens, fields and forests worldwide.",
    diet: "Aphids and other tiny garden bugs.",
    funFacts: [
      "Ladybugs are great for gardens — they eat pests.",
      "A single ladybug can eat 5,000 aphids in its life.",
      "Their bright spots warn predators that they taste bad.",
      "Some ladybugs are yellow, orange or even black."
    ]
  },
  { id: "ant", name: "Ant", emoji: "🐜", category: "bugs",
    habitat: "Everywhere except Antarctica!",
    diet: "Seeds, sugar, other insects — almost anything.",
    funFacts: [
      "Ants can carry 50 times their own body weight.",
      "They live in colonies with thousands of ants working together.",
      "Each colony has one queen who lays all the eggs.",
      "Ants leave scent trails so others can find food."
    ]
  },
  { id: "spider", name: "Spider", emoji: "🕷️", category: "bugs",
    habitat: "Almost everywhere on Earth.",
    diet: "Insects and other spiders.",
    funFacts: [
      "Spiders have 8 legs — they are not insects.",
      "Spider silk is stronger than steel of the same thickness!",
      "Some spiders can jump 50 times their body length.",
      "Not all spiders make webs — some hunt instead."
    ]
  },
  { id: "dragonfly", name: "Dragonfly", emoji: "🐉", category: "bugs",
    habitat: "Ponds, rivers and lakes worldwide.",
    diet: "Mosquitoes and small flying insects.",
    funFacts: [
      "Dragonflies are amazing fliers — they can hover and fly backwards.",
      "They have huge eyes that can see in nearly every direction.",
      "Dragonflies have been on Earth for 300 million years.",
      "They can fly up to 50 km/h."
    ]
  },
  { id: "grasshopper", name: "Grasshopper", emoji: "🦗", category: "bugs",
    habitat: "Fields, meadows and gardens worldwide.",
    diet: "Grass and leaves.",
    funFacts: [
      "Grasshoppers can jump 20 times their body length.",
      "They make their chirping sound by rubbing their legs and wings.",
      "Grasshoppers have ears on their belly.",
      "They've been around for over 250 million years."
    ]
  },
  { id: "beetle", name: "Beetle", emoji: "🪲", category: "bugs",
    habitat: "Every habitat on Earth except oceans and Antarctica.",
    diet: "Plants, other insects, dead animals — depends on species.",
    funFacts: [
      "Beetles make up about 1 in every 4 animal species on Earth!",
      "Their hard front wings protect the soft flying wings underneath.",
      "Dung beetles roll balls of poop bigger than themselves.",
      "Some beetles glow, like fireflies."
    ]
  },
  { id: "caterpillar", name: "Caterpillar", emoji: "🐛", category: "bugs",
    habitat: "Wherever there are plants and leaves.",
    diet: "Leaves and plants.",
    funFacts: [
      "Caterpillars turn into butterflies or moths.",
      "Some caterpillars have 4,000 muscles in their body — humans have only about 650.",
      "They have 12 eyes — but pretty bad eyesight.",
      "Caterpillars shed their skin as they grow."
    ]
  },
  { id: "snail", name: "Snail", emoji: "🐌", category: "bugs",
    habitat: "Gardens, forests and ponds worldwide.",
    diet: "Plants, leaves and decaying matter.",
    funFacts: [
      "Snails carry their houses on their backs.",
      "They glide on a slimy trail called mucus.",
      "Some snails can sleep for up to 3 years!",
      "Snails have thousands of tiny teeth on their tongue."
    ]
  },

  // ===== FARM ANIMALS (10) =====
  { id: "cow", name: "Cow", emoji: "🐄", category: "farm",
    habitat: "Farms and pastures around the world.",
    diet: "Grass and hay.",
    funFacts: [
      "Cows have 4 stomach compartments to digest grass.",
      "They have best friends and get stressed when separated.",
      "Cows can walk up stairs but not down them very well.",
      "Each cow has a unique nose print, like a fingerprint."
    ]
  },
  { id: "sheep", name: "Sheep", emoji: "🐑", category: "farm",
    habitat: "Farms and hills around the world — especially NZ!",
    diet: "Grass and hay.",
    funFacts: [
      "New Zealand has more sheep than people!",
      "Sheep can recognise up to 50 different faces.",
      "Their wool keeps growing — they need shearing once a year.",
      "Baby sheep are called lambs."
    ]
  },
  { id: "pig", name: "Pig", emoji: "🐷", category: "farm",
    habitat: "Farms worldwide.",
    diet: "Plants, grains, fruit and scraps — they're omnivores.",
    funFacts: [
      "Pigs are very smart — smarter than dogs!",
      "They roll in mud to stay cool and protect their skin.",
      "Pigs can learn their names and tricks.",
      "Baby pigs are called piglets."
    ]
  },
  { id: "horse", name: "Horse", emoji: "🐴", category: "farm",
    habitat: "Farms, fields and stables worldwide.",
    diet: "Grass, hay, oats and carrots.",
    funFacts: [
      "Horses sleep standing up — and lying down sometimes.",
      "They can run within hours of being born!",
      "Horses' eyes are the biggest of any land mammal.",
      "A horse's gallop is faster than 50 km/h."
    ]
  },
  { id: "chicken", name: "Chicken", emoji: "🐔", category: "farm",
    habitat: "Farms and backyards worldwide.",
    diet: "Seeds, grains, insects and worms.",
    funFacts: [
      "Chickens can recognise over 100 other chickens by face.",
      "They dream while they sleep — just like us.",
      "A chicken once lived 18 months without a head! (a famous bird called Mike)",
      "Chickens are the closest living relatives of the T. rex."
    ]
  },
  { id: "goat", name: "Goat", emoji: "🐐", category: "farm",
    habitat: "Farms and mountains worldwide.",
    diet: "Grass, leaves, weeds — almost any plant!",
    funFacts: [
      "Goats have rectangular pupils that give them wide vision.",
      "Baby goats are called kids.",
      "Goats are great climbers — they can scale steep cliffs.",
      "They love to headbutt to play and figure out who's the boss."
    ]
  },
  { id: "donkey", name: "Donkey", emoji: "🫏", category: "farm",
    habitat: "Farms and dry areas worldwide.",
    diet: "Grass, straw and hay.",
    funFacts: [
      "Donkeys are very smart and have a great memory.",
      "Their 'hee-haw' sound can be heard 3 km away.",
      "Donkeys can carry heavy loads up steep hills.",
      "They like company and can get sad if kept alone."
    ]
  },
  { id: "rooster", name: "Rooster", emoji: "🐓", category: "farm",
    habitat: "Farms and backyards worldwide.",
    diet: "Seeds, grains and insects.",
    funFacts: [
      "Roosters crow to mark their territory.",
      "They don't only crow at dawn — they crow all day!",
      "Roosters have a comb (red crown) and wattle on their face.",
      "They take care of the hens by warning them of danger."
    ]
  },
  { id: "goose", name: "Goose", emoji: "🪿", category: "farm",
    habitat: "Farms, lakes and parks worldwide.",
    diet: "Grass, grains and seeds.",
    funFacts: [
      "Geese fly in a V-shape to save energy.",
      "They pair up with one partner for life.",
      "Geese are great guards — they honk loudly when strangers come.",
      "A baby goose is called a gosling."
    ]
  },
  { id: "alpaca", name: "Alpaca", emoji: "🦙", category: "farm",
    habitat: "South American mountains and farms worldwide.",
    diet: "Grass and hay.",
    funFacts: [
      "Alpacas hum when they're happy or curious.",
      "Their wool is soft and warm — and doesn't itch.",
      "Alpacas spit when they're angry or annoyed.",
      "They live in herds and are very social."
    ]
  },

  // ===== PETS (5) =====
  { id: "dog", name: "Dog", emoji: "🐶", category: "pets",
    habitat: "Homes everywhere with humans.",
    diet: "Dog food, meat and treats.",
    funFacts: [
      "Dogs can smell about 100,000 times better than humans — they can even smell some diseases.",
      "A border collie called Chaser learned the names of 1,022 different toys.",
      "Dogs sweat through the pads of their feet, not their skin.",
      "When dogs dream, their paws twitch just like ours.",
      "Puppies are born deaf and blind — their senses kick in after about 2 weeks."
    ]
  },
  { id: "cat", name: "Cat", emoji: "🐱", category: "pets",
    habitat: "Homes and neighbourhoods around the world.",
    diet: "Cat food, meat and fish.",
    funFacts: [
      "Cats sleep about 16 hours a day — that's 2/3 of their life!",
      "A cat's purr vibrates at a frequency that helps heal its own bones.",
      "A cat has 32 muscles in each ear — humans only have 6.",
      "Cats can't taste sweetness — they're missing the gene for it.",
      "A cat's nose print is as unique as a human fingerprint."
    ]
  },
  { id: "rabbit", name: "Rabbit", emoji: "🐰", category: "pets",
    habitat: "Hutches at home, fields and meadows.",
    diet: "Grass, hay, vegetables and fruit.",
    funFacts: [
      "Rabbits do happy jumps called 'binkies'.",
      "Their teeth never stop growing.",
      "Rabbits can see almost all the way around their head.",
      "Baby rabbits are called kits or kittens."
    ]
  },
  { id: "hamster", name: "Hamster", emoji: "🐹", category: "pets",
    habitat: "Cages at home; deserts in the wild.",
    diet: "Seeds, grains, vegetables and fruit.",
    funFacts: [
      "Hamsters can store food in their cheeks — they puff up huge!",
      "They run for kilometres on their wheels every night.",
      "Hamsters are nocturnal and sleep during the day.",
      "Their name comes from the German word 'hamstern' (to hoard)."
    ]
  },
  { id: "guinea-pig", name: "Guinea Pig", emoji: "🐹", category: "pets",
    habitat: "Cages at home; mountains of South America in the wild.",
    diet: "Hay, grass, vegetables and fruit.",
    funFacts: [
      "Guinea pigs make happy 'wheek wheek' noises when they see food.",
      "They are not pigs and not from Guinea — strange name!",
      "Guinea pigs do 'popcorning' — jumping straight up when happy.",
      "They love company and live happier in pairs."
    ]
  }
];

// Maps animal id → Wikipedia article title. Used to auto-fetch a photo.
const ANIMAL_WIKI = {
  // NZ Native
  kiwi: "Kiwi (bird)", tuatara: "Tuatara", kea: "Kea",
  takahe: "South Island takahē", kakapo: "Kākāpō", pukeko: "Pūkeko",
  weka: "Weka", fantail: "New Zealand fantail", tui: "Tūī",
  bellbird: "New Zealand bellbird", "hector-dolphin": "Hector's dolphin",
  hoiho: "Yellow-eyed penguin", "nz-sealion": "New Zealand sea lion",
  weta: "Wētā", morepork: "Morepork",
  // Marine
  dolphin: "Common bottlenose dolphin", shark: "Great white shark",
  whale: "Humpback whale", octopus: "Octopus", "sea-turtle": "Sea turtle",
  jellyfish: "Jellyfish", seahorse: "Seahorse", starfish: "Starfish",
  crab: "Crab", lobster: "Lobster", stingray: "Stingray",
  clownfish: "Ocellaris clownfish", orca: "Orca", seal: "Harbor seal",
  "manta-ray": "Manta ray",
  // Wild Mammals
  lion: "Lion", tiger: "Tiger", elephant: "Elephant", giraffe: "Giraffe",
  zebra: "Plains zebra", monkey: "Monkey", gorilla: "Gorilla",
  panda: "Giant panda", "polar-bear": "Polar bear", kangaroo: "Red kangaroo",
  koala: "Koala", wolf: "Wolf", fox: "Red fox", bear: "Brown bear",
  cheetah: "Cheetah", leopard: "Leopard", hippo: "Hippopotamus",
  rhino: "Rhinoceros", camel: "Camel", sloth: "Sloth",
  // Birds
  eagle: "Bald eagle", owl: "Owl", penguin: "Emperor penguin",
  parrot: "Parrot", flamingo: "Flamingo", peacock: "Indian peafowl",
  hummingbird: "Hummingbird", toucan: "Toco toucan", pelican: "Pelican",
  swan: "Mute swan", duck: "Mallard", ostrich: "Common ostrich",
  woodpecker: "Woodpecker", robin: "European robin", seagull: "Gull",
  // Reptiles & Amphibians
  crocodile: "Crocodile", snake: "Ball python", gecko: "Gecko",
  chameleon: "Chameleon", frog: "Frog", toad: "Common toad",
  turtle: "Turtle", iguana: "Green iguana", salamander: "Salamander",
  komodo: "Komodo dragon",
  // Insects & Bugs
  butterfly: "Monarch butterfly", bee: "Western honey bee",
  ladybug: "Coccinellidae", ant: "Ant", spider: "Spider",
  dragonfly: "Dragonfly", grasshopper: "Grasshopper", beetle: "Beetle",
  caterpillar: "Caterpillar", snail: "Snail",
  // Farm
  cow: "Cattle", sheep: "Sheep", pig: "Domestic pig", horse: "Horse",
  chicken: "Chicken", goat: "Goat", donkey: "Donkey", rooster: "Rooster",
  goose: "Goose", alpaca: "Alpaca",
  // Pets
  dog: "Dog", cat: "Cat", rabbit: "Rabbit", hamster: "Hamster",
  "guinea-pig": "Guinea pig"
};

// Suggested YouTube video IDs per animal id — visible only to teachers for review.
// Students never see these unless a teacher approves one (which copies it into the
// override's `youtubeId` field, the only thing the student page reads).
const ANIMAL_VIDEO_SUGGESTIONS = {
  // NZ Native
  kiwi: "NPc25pbM95c",       tuatara: "0Q1qKSO3bwI",    kea: "0k-PBKax3pg",
  takahe: "MSt_SHR6sxc",     kakapo: "E3a88_SjJR0",     pukeko: "mLJeVglA6Ww",
  weka: "dN6FAIl4YWg",       fantail: "bWHsFAcrQOk",    tui: "QshiDOOgR6A",
  bellbird: "HjMn_hJ-zsY",   "hector-dolphin": "y7Oym6ZiUrI",
  hoiho: "9eyMYAR_g6w",      "nz-sealion": "M0Pu_3p2gts",
  weta: "HtDIqicyDQw",       morepork: "HE8X0hUj5LI",

  // Marine
  dolphin: "VjMn_dVCJyA",    shark: "3kALq2rtPPQ",      whale: "Hiu1l59UFiQ",
  octopus: "oSyEZAm8nb8",    "sea-turtle": "qJfAbyz4qS0",
  jellyfish: "u9Q9knJlhww",  seahorse: "XqP0xqbnAMU",   starfish: "SpC6H-RkPyE",
  crab: "85lFKu_IwCA",       lobster: "jKzjSj1VO3E",    stingray: "nJEKCmi8Hyk",
  clownfish: "vW5RI8xUW7Y",  orca: "4YOvkXNZ16I",       seal: "bxF1L3i1A9Q",
  "manta-ray": "SFVueRCmoeI",

  // Wild Mammals
  lion: "tlZwYsJpqjo",       tiger: "8OmRW4em_vA",      elephant: "Fk3VdpuFx0Q",
  giraffe: "WSlqkTSOdGA",    zebra: "kWxnadQI5Qw",      monkey: "A6lmmAyvl3I",
  gorilla: "rHhSCO5-3Pg",    panda: "O5f-4h7L5ts",      "polar-bear": "XdCaBF8NJ00",
  kangaroo: "QKO3sqic5fc",   koala: "PzU-DjUMzsg",      wolf: "VYKsI5ILiaQ",
  fox: "bD0mresKnTY",        bear: "54CDgurNMSI",       cheetah: "J20eXhZTHEo",
  leopard: "8y2B1XgXwxo",    hippo: "ks_P46IZCxk",      rhino: "TYklMREHD-s",
  camel: "IJ4YajWrDcA",      sloth: "emQ8SujptUk",

  // Birds
  eagle: "BEgEIEfSuvU",      owl: "ifXMpuNk9RA",        penguin: "tkfJnPOt1eQ",
  parrot: "NJ9Z6mSIMXk",     flamingo: "ugCyyLOLWt0",   peacock: "8NuJySMSk-4",
  hummingbird: "remX_MugsOM",toucan: "9QbyE4iPGYU",     pelican: "GVpAR5jl-ZA",
  swan: "LRPLk6ddfzw",       duck: "qHgKppJq8sY",       ostrich: "qxbxsTy3PPw",
  woodpecker: "tJizlKZizps", robin: "qGz-pO0QTN4",      seagull: "PHVWPJl4aYc",

  // Reptiles & Amphibians
  crocodile: "qyTNzTYFqlw",  snake: "uns8vUQNxpc",      gecko: "rspoqBDL738",
  chameleon: "D1PIcwK7Ggc",  frog: "-r6tZGMep0U",       toad: "QnGWuARQEHY",
  turtle: "xB0OodoGuUQ",     iguana: "Ef5BL7AvjGs",     salamander: "CUhE5T62mPg",
  komodo: "BaJizC9NdTY",

  // Insects & Bugs
  butterfly: "unGHaH7CtBA",  bee: "ta154f5Rp5Y",        ladybug: "KZDMnnGyeoI",
  ant: "XVFM2bLCTJE",        spider: "3qdxEiIB_Sw",     dragonfly: "lxubbepoz7Q",
  grasshopper: "z48Nc3ontNA",beetle: "veY5fyt66cg",     caterpillar: "wW5oU5ALh3A",
  snail: "c8ma6vDvXAM",

  // Farm
  cow: "C3l27fFeSPk",        sheep: "vK3KsFd2YnQ",      pig: "06sDgp3wZUc",
  horse: "GCkih9VMrSo",      chicken: "9cKSLWbDk4s",    goat: "QpGDm7KI6Xs",
  donkey: "JfdXYE3QljA",     rooster: "PO415JIEPUc",    goose: "UC6jWVazSpg",
  alpaca: "VfPeiVhx3mI",

  // Pets
  dog: "b43PbeSekDo",        cat: "G5RErqM1RZk",        rabbit: "fklCebi4dtU",
  hamster: "keIiS_8TvXg",    "guinea-pig": "1GPKI7gg4D0"
};

// ---------- helpers used by all pages ----------
const STORAGE_KEY = "animals_admin_overrides_v1";
const WIKI_CACHE_KEY = "animals_wiki_image_cache_v1";
const OPENVERSE_CACHE_KEY = "animals_openverse_image_cache_v2";

// Cleaner search-friendly names for animals where the basic id/name gives noisy results.
// Used by the Openverse cartoon / coloring search.
const ANIMAL_SEARCH_NAMES = {
  kiwi: "kiwi bird",
  weka: "weka bird",
  tui: "tui bird",
  pukeko: "pukeko bird",
  takahe: "takahe",
  hoiho: "yellow-eyed penguin",
  weta: "weta insect",
  morepork: "morepork owl",
  fantail: "fantail bird",
  bellbird: "bellbird",
  kakapo: "kakapo",
  kea: "kea bird",
  "hector-dolphin": "hector dolphin",
  "nz-sealion": "sea lion",
  rooster: "rooster",
  robin: "robin bird",
  swan: "swan",
  duck: "duck",
  goose: "goose",
  shark: "great white shark",
  whale: "humpback whale",
  seal: "seal animal",
  bear: "brown bear",
  "polar-bear": "polar bear",
  "sea-turtle": "sea turtle",
  "manta-ray": "manta ray",
  snake: "snake reptile",
  komodo: "komodo dragon",
  "guinea-pig": "guinea pig"
};

function getSearchName(animal) {
  if (!animal) return "";
  if (ANIMAL_SEARCH_NAMES[animal.id]) return ANIMAL_SEARCH_NAMES[animal.id];
  // Prefer the English name in parens (e.g. "Pīwakawaka (Fantail)" → "Fantail").
  const m = animal.name.match(/\((.*?)\)/);
  if (m) return m[1];
  return animal.name.replace(/\s*\(.*?\)\s*/g, " ").trim();
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveOverrides(overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function withSuggestion(base, override) {
  const merged = override ? { ...base, ...override } : { ...base };
  // suggestedYoutubeId is for the teacher to review — never read by the student page.
  merged.suggestedYoutubeId = ANIMAL_VIDEO_SUGGESTIONS[base.id] || "";
  return merged;
}

function getMergedAnimals() {
  const overrides = loadOverrides();
  return ANIMALS.map(a => withSuggestion(a, overrides[a.id]));
}

function getMergedAnimal(id) {
  const base = ANIMALS.find(a => a.id === id);
  if (!base) return null;
  return withSuggestion(base, loadOverrides()[id]);
}

function getCategoryById(id) {
  return ANIMAL_CATEGORIES.find(c => c.id === id);
}

// ---------- Wikipedia image fetching ----------
function loadWikiCache() {
  try { return JSON.parse(localStorage.getItem(WIKI_CACHE_KEY) || "{}"); }
  catch (e) { return {}; }
}
function saveWikiCache(c) {
  try { localStorage.setItem(WIKI_CACHE_KEY, JSON.stringify(c)); } catch (e) {}
}

// Upgrade a Wikipedia thumbnail URL like ".../320px-foo.jpg" to a larger width.
function upscaleWikiThumb(url, targetWidth) {
  if (!url) return url;
  return url.replace(/\/(\d+)px-([^/]+)$/, (_, _w, name) => `/${targetWidth}px-${name}`);
}

// Pre-fetched Wikipedia thumbnail URLs (size 330px) for all 100 animals.
// Hardcoded so the student page can load photos via plain <img src> with no
// runtime fetch — works even in sandboxed previews that block cross-origin XHR.
const ANIMAL_PHOTO_URLS = {
  "kiwi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/TeTuatahianui.jpg/330px-TeTuatahianui.jpg",
  "tuatara": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Tuatara_%285205719005%29.jpg/330px-Tuatara_%285205719005%29.jpg",
  "kea": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nestor_notabilis_-Fiordland%2C_New_Zealand-8b.jpg/330px-Nestor_notabilis_-Fiordland%2C_New_Zealand-8b.jpg",
  "takahe": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Male_takahe_walking_on_grass.jpg/330px-Male_takahe_walking_on_grass.jpg",
  "kakapo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Sirocco_full_length_portrait.jpg/330px-Sirocco_full_length_portrait.jpg",
  "pukeko": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Australasian_swamphen_%28Porphyrio_melanotus%29_Tiritiri_Matangi.jpg/330px-Australasian_swamphen_%28Porphyrio_melanotus%29_Tiritiri_Matangi.jpg",
  "weka": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/0A2A9595_Weka.jpg/330px-0A2A9595_Weka.jpg",
  "fantail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/The_New_Zealand_fantail_%28Rhipidura_fuliginosa%29_%2826323434203%29.jpg/330px-The_New_Zealand_fantail_%28Rhipidura_fuliginosa%29_%2826323434203%29.jpg",
  "tui": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Tui_%28Prosthemadera_novaeseelandiae%29_Tiritiri_Matangi.jpg/330px-Tui_%28Prosthemadera_novaeseelandiae%29_Tiritiri_Matangi.jpg",
  "bellbird": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/New_Zealand_bellbird_%28Anthornis_melanura%29_male_Tiritiri_Matangi.jpg/330px-New_Zealand_bellbird_%28Anthornis_melanura%29_male_Tiritiri_Matangi.jpg",
  "hector-dolphin": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hector%27s_Dolphins_at_Porpoise_Bay_1999_a_cropped.jpg/330px-Hector%27s_Dolphins_at_Porpoise_Bay_1999_a_cropped.jpg",
  "hoiho": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Yellow-eyed_Penguin_MC.jpg/330px-Yellow-eyed_Penguin_MC.jpg",
  "nz-sealion": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Big_male_New_Zealand_Sea_Lion_walking_on_the_beach.jpg/330px-Big_male_New_Zealand_Sea_Lion_walking_on_the_beach.jpg",
  "weta": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Male_tree_weta-orig.jpg/330px-Male_tree_weta-orig.jpg",
  "morepork": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Morepork_0A2A7676.jpg/330px-Morepork_0A2A7676.jpg",
  "dolphin": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Tursiops_truncatus_01-cropped.jpg/330px-Tursiops_truncatus_01-cropped.jpg",
  "shark": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/330px-White_shark.jpg",
  "whale": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Humpback_Whale_underwater_shot.jpg/330px-Humpback_Whale_underwater_shot.jpg",
  "octopus": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/330px-Octopus2.jpg",
  "sea-turtle": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chelonia_mydas_is_going_for_the_air_edit.jpg/330px-Chelonia_mydas_is_going_for_the_air_edit.jpg",
  "jellyfish": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jelly_cc11.jpg/330px-Jelly_cc11.jpg",
  "seahorse": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Hippocampus_hippocampus_%28on_Ascophyllum_nodosum%29.jpg/330px-Hippocampus_hippocampus_%28on_Ascophyllum_nodosum%29.jpg",
  "starfish": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Starfish_montage.png/330px-Starfish_montage.png",
  "crab": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Cancer_pagurus.jpg/330px-Cancer_pagurus.jpg",
  "lobster": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/KreeftbijDenOsse.jpg/330px-KreeftbijDenOsse.jpg",
  "stingray": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SStringray.jpg/330px-SStringray.jpg",
  "clownfish": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Clown_fish_in_the_Andaman_Coral_Reef.jpg/330px-Clown_fish_in_the_Andaman_Coral_Reef.jpg",
  "orca": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/330px-Killerwhales_jumping.jpg",
  "seal": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Common_seal_%28Phoca_vitulina%29_2.jpg/330px-Common_seal_%28Phoca_vitulina%29_2.jpg",
  "manta-ray": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dharavandhoo_Thila_-_Manata_Black_Pearl.JPG/330px-Dharavandhoo_Thila_-_Manata_Black_Pearl.JPG",
  "lion": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/330px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
  "tiger": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg/330px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg",
  "elephant": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/330px-African_Bush_Elephant.jpg",
  "giraffe": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/330px-Giraffe_Mikumi_National_Park.jpg",
  "zebra": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Equus_quagga_burchellii_-_Etosha%2C_2014.jpg/330px-Equus_quagga_burchellii_-_Etosha%2C_2014.jpg",
  "monkey": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/BrownSpiderMonkey_%28edit2%29.jpg/330px-BrownSpiderMonkey_%28edit2%29.jpg",
  "gorilla": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg/330px-Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg",
  "panda": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/330px-Grosser_Panda.JPG",
  "polar-bear": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/330px-Polar_Bear_-_Alaska_%28cropped%29.jpg",
  "kangaroo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Red_kangaroo_-_melbourne_zoo.jpg/330px-Red_kangaroo_-_melbourne_zoo.jpg",
  "koala": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/330px-Koala_climbing_tree.jpg",
  "wolf": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eurasian_wolf_2.jpg/330px-Eurasian_wolf_2.jpg",
  "fox": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog_%28cropped%29.jpg/330px-Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog_%28cropped%29.jpg",
  "bear": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/330px-2010-kodiak-bear-1.jpg",
  "cheetah": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/330px-Male_cheetah_facing_left_in_South_Africa.jpg",
  "leopard": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/330px-African_leopard_male_%28cropped%29.jpg",
  "hippo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/330px-Portrait_Hippopotamus_in_the_water.jpg",
  "rhino": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rhino_collage.png/330px-Rhino_collage.png",
  "camel": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg/330px-07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg",
  "sloth": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bicho-pregui%C3%A7a_3.jpg/330px-Bicho-pregui%C3%A7a_3.jpg",
  "eagle": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/330px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg",
  "owl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bubo_bubo_sibiricus_-_01.JPG/330px-Bubo_bubo_sibiricus_-_01.JPG",
  "penguin": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg/330px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg",
  "parrot": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg/330px-Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg",
  "flamingo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flamingos_Laguna_Colorada.jpg/330px-Flamingos_Laguna_Colorada.jpg",
  "peacock": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/330px-Peacock_on_tree_%2852077240794%29.jpg",
  "hummingbird": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Trinidad_and_Tobago_hummingbirds_composite.jpg/330px-Trinidad_and_Tobago_hummingbirds_composite.jpg",
  "toucan": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/330px-006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
  "pelican": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pelikan_Walvis_Bay.jpg/330px-Pelikan_Walvis_Bay.jpg",
  "swan": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mute_Swan_Emsworth2.JPG/330px-Mute_Swan_Emsworth2.JPG",
  "duck": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg/330px-Anas_platyrhynchos_male_female_quadrat.jpg",
  "ostrich": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Struthio_camelus_-_Etosha_2014_%283%29.jpg/330px-Struthio_camelus_-_Etosha_2014_%283%29.jpg",
  "woodpecker": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/PileatedWoodpeckerFeedingonTree%2C_crop.jpg/330px-PileatedWoodpeckerFeedingonTree%2C_crop.jpg",
  "robin": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Erithacus_rubecula_with_cocked_head.jpg/330px-Erithacus_rubecula_with_cocked_head.jpg",
  "seagull": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Herring_Gull_%28Larus_argentatus%29%2C_Brighton%2C_England.JPG/330px-Herring_Gull_%28Larus_argentatus%29%2C_Brighton%2C_England.JPG",
  "crocodile": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/330px-Nile_crocodile_head.jpg",
  "snake": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ball_python_lucy.JPG/330px-Ball_python_lucy.JPG",
  "gecko": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Phelsuma_l._laticauda.jpg/330px-Phelsuma_l._laticauda.jpg",
  "chameleon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Panther_Chameleon_738367_%28cropped%29.jpg/330px-Panther_Chameleon_738367_%28cropped%29.jpg",
  "frog": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Red-eyed_Leaf_Frog_%2849661076226%29.jpg/330px-Red-eyed_Leaf_Frog_%2849661076226%29.jpg",
  "toad": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Common_Toad_Cornwall.jpeg/330px-Common_Toad_Cornwall.jpeg",
  "turtle": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Turtle_diversity.jpg/330px-Turtle_diversity.jpg",
  "iguana": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Iguana_iguana_%28male_resting%29.jpg/330px-Iguana_iguana_%28male_resting%29.jpg",
  "salamander": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/SpottedSalamander.jpg/330px-SpottedSalamander.jpg",
  "komodo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/202306_Varanus_komodoensis.jpg/330px-202306_Varanus_komodoensis.jpg",
  "butterfly": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg/330px-Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg",
  "bee": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Apis_mellifera_Western_honey_bee.jpg/330px-Apis_mellifera_Western_honey_bee.jpg",
  "ladybug": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Coccinella-septempunctata-15-fws.jpg/330px-Coccinella-septempunctata-15-fws.jpg",
  "ant": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Red_Ant_-_March_2025.jpg/330px-Red_Ant_-_March_2025.jpg",
  "spider": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Araneae3.jpg/330px-Araneae3.jpg",
  "dragonfly": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Red_grasshawk_%28Neurothemis_fluctuans%29_male_Phuket_2.jpg/330px-Red_grasshawk_%28Neurothemis_fluctuans%29_male_Phuket_2.jpg",
  "grasshopper": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/American_Bird_Grasshopper.jpg/330px-American_Bird_Grasshopper.jpg",
  "beetle": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Coleoptera_collage.png/330px-Coleoptera_collage.png",
  "caterpillar": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chenille_de_Grand_porte_queue_%28macaon%29.jpg/330px-Chenille_de_Grand_porte_queue_%28macaon%29.jpg",
  "snail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Snail.jpg/330px-Snail.jpg",
  "cow": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg/330px-Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg",
  "sheep": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flock_of_sheep.jpg/330px-Flock_of_sheep.jpg",
  "pig": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pig_farm_Vampula_1.jpg/330px-Pig_farm_Vampula_1.jpg",
  "horse": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Horse_007.jpg/330px-Horse_007.jpg",
  "chicken": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Male_and_female_chicken_sitting_together.jpg/330px-Male_and_female_chicken_sitting_together.jpg",
  "goat": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/330px-Hausziege_04.jpg",
  "donkey": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg/330px-Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg",
  "rooster": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Male_and_female_chicken_sitting_together.jpg/330px-Male_and_female_chicken_sitting_together.jpg",
  "goose": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Anser_anser_1_%28Piotr_Kuczynski%29_%28cropped%29.jpg/330px-Anser_anser_1_%28Piotr_Kuczynski%29_%28cropped%29.jpg",
  "alpaca": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Alpaca_in_Higashiyama_Zoo_-_1.jpg/330px-Alpaca_in_Higashiyama_Zoo_-_1.jpg",
  "dog": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/330px-Huskiesatrest.jpg",
  "cat": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/330px-Cat_August_2010-4.jpg",
  "rabbit": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/330px-Oryctolagus_cuniculus_Rcdo.jpg",
  "hamster": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/European_hamster_%28Cricetus_cricetus%29_Meidling.jpg/330px-European_hamster_%28Cricetus_cricetus%29_Meidling.jpg",
  "guinea-pig": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_the_amazing_guinea_pig.jpg/330px-George_the_amazing_guinea_pig.jpg"
};

// Returns the Wikipedia photo URL for an animal. Synchronous lookup against the
// pre-fetched map above — no network call needed. (Async signature kept so callers
// don't need to change.)
async function fetchWikipediaImage(id) {
  return ANIMAL_PHOTO_URLS[id] || null;
}

// ---------- Openverse image fetching (cartoons + coloring pages) ----------
function loadOpenverseCache() {
  try { return JSON.parse(localStorage.getItem(OPENVERSE_CACHE_KEY) || "{}"); }
  catch (e) { return {}; }
}
function saveOpenverseCache(c) {
  try { localStorage.setItem(OPENVERSE_CACHE_KEY, JSON.stringify(c)); } catch (e) {}
}

// Fetches a kid-friendly cartoon or coloring-page image from the Openverse
// open-license image index. category: 'cartoon' | 'coloring'.
async function fetchOpenverseImage(id, searchName, category) {
  if (!searchName) return null;
  const cacheKey = `${id}__${category}`;
  const cache = loadOpenverseCache();
  if (cache[cacheKey]) return cache[cacheKey];

  const query = category === "cartoon"
    ? `${searchName} cartoon`
    : `${searchName} coloring page`;

  try {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=10`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    const results = (data && data.results) || [];
    if (results.length === 0) return null;

    // Prefer cleaner-clipart providers first.
    let best = results.find(r => r.provider === "rawpixel");
    if (!best) best = results.find(r => r.provider === "wikimedia");
    if (!best) best = results[0];
    const imgUrl = best && best.url;
    if (imgUrl) {
      cache[cacheKey] = imgUrl;
      saveOpenverseCache(cache);
    }
    return imgUrl || null;
  } catch (e) {
    return null;
  }
}

// Teacher's custom additions per category. Handles legacy `image` and `images`.
function getCustomPhotos(id) {
  const ov = loadOverrides()[id];
  if (!ov) return [];
  if (Array.isArray(ov.photos)) return ov.photos.filter(Boolean);
  if (Array.isArray(ov.images)) return ov.images.filter(Boolean);
  if (ov.image) return [ov.image];
  return [];
}
function getCustomCartoons(id) {
  const ov = loadOverrides()[id];
  return (ov && Array.isArray(ov.cartoons)) ? ov.cartoons.filter(Boolean) : [];
}
function getCustomColoring(id) {
  const ov = loadOverrides()[id];
  return (ov && Array.isArray(ov.coloringPages)) ? ov.coloringPages.filter(Boolean) : [];
}

// Returns a Promise resolving to all images for an animal, grouped by category.
// Each entry is { src, source } where source ∈ {wikipedia, openverse, custom}.
async function getAnimalImageSet(animal) {
  if (!animal) return { photos: [], cartoons: [], coloringPages: [] };
  const searchName = getSearchName(animal);

  // Photos: Wikipedia default + teacher additions.
  const photos = [];
  const wiki = await fetchWikipediaImage(animal.id);
  if (wiki) photos.push({ src: wiki, source: "wikipedia" });
  getCustomPhotos(animal.id).forEach(s => photos.push({ src: s, source: "custom" }));

  // Cartoons: Openverse default + teacher additions.
  const cartoons = [];
  const cartoonUrl = await fetchOpenverseImage(animal.id, searchName, "cartoon");
  if (cartoonUrl) cartoons.push({ src: cartoonUrl, source: "openverse" });
  getCustomCartoons(animal.id).forEach(s => cartoons.push({ src: s, source: "custom" }));

  // Coloring pages: Openverse default + teacher additions.
  const coloringPages = [];
  const coloringUrl = await fetchOpenverseImage(animal.id, searchName, "coloring");
  if (coloringUrl) coloringPages.push({ src: coloringUrl, source: "openverse" });
  getCustomColoring(animal.id).forEach(s => coloringPages.push({ src: s, source: "custom" }));

  return { photos, cartoons, coloringPages };
}

// Reads the teacher's custom photos for an animal as an array of data URLs.
// Handles legacy single-`image` field too.
function getCustomImages(id) {
  const ov = loadOverrides()[id];
  if (!ov) return [];
  if (Array.isArray(ov.images)) return ov.images.filter(Boolean);
  if (ov.image) return [ov.image];
  return [];
}

// Resolves all photos for an animal in display order:
//   [{src, source:'wikipedia'}, {src, source:'custom'}, ...]
// Wikipedia photo (if any) comes first, then teacher-added photos.
async function getAnimalImages(animal) {
  if (!animal) return [];
  const result = [];
  const wiki = await fetchWikipediaImage(animal.id);
  if (wiki) result.push({ src: wiki, source: "wikipedia" });
  getCustomImages(animal.id).forEach(src => result.push({ src, source: "custom" }));
  return result;
}

// Kept for backward compatibility — first image only.
async function getAnimalImage(animal) {
  const arr = await getAnimalImages(animal);
  return arr.length ? arr[0].src : null;
}

// Convert any YouTube URL to a video ID.
// Accepts:  https://www.youtube.com/watch?v=ID
//           https://youtu.be/ID
//           https://www.youtube.com/embed/ID
//           https://www.youtube.com/shorts/ID
//           Or a bare ID (11 chars)
function extractYouTubeId(input) {
  if (!input) return "";
  const s = String(input).trim();
  if (!s) return "";
  // Bare ID
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  try {
    const url = new URL(s);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return url.pathname.slice(1).split("/")[0];
    }
    if (host.endsWith("youtube.com")) {
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex(p => p === "embed" || p === "shorts");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch (_) {
    // not a URL
  }
  // Last resort: try regex
  const m = s.match(/[A-Za-z0-9_-]{11}/);
  return m ? m[0] : "";
}
