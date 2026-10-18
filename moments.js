// What's on the tiles, and Ash's notes. Edit freely: this file is just words.
//
// Each tile has a cat (oliver, finley, madeline, or all) and is either:
//   a moment: something to do for a minute. Text in `home` and `work`, or `any` for both.
//   a question (type: 'prompt'): her answer is kept as a lantern. `asks` are other ways to put it.
// Every list holds a few versions; one is shown at a time, and "Another way" shows the next.
// The order is mixed up on purpose, so the cats and questions don’t fall into a pattern.
// "From the cats" always comes last.

const TILES = [
  {
    id: 'window', cat: 'oliver', extra: 'window',
    title: 'A window', line: 'Thirty seconds of looking far away.',
    home: [
      'Find a window and look out of it for thirty seconds. Let your eyes go as far as they can reach.',
      'Go to the window Oliver would pick. Look out until you spot one thing moving. If you see a bug, resist the urge to chase it.',
    ],
    work: [
      'No window in that office, so here is one. Look at it for thirty seconds, or close your eyes and picture a view you love.',
    ],
  },
  {
    id: 'love', cat: 'madeline', type: 'prompt',
    title: 'Something you love', line: 'About you, specifically.',
    asks: [
      'What’s one thing you love about yourself?',
      'What would the cats say they love about you? (Besides treats.)',
      'What would Ash say she loves about you?',
    ],
  },
  {
    id: 'shuffle', cat: 'finley', extra: 'dance',
    title: 'A little shuffle', line: 'Three seconds is plenty.',
    home: [
      'Get up and dance for three seconds. Badly counts. Badly might be best.',
      'Put on a song and dance to the first three seconds of it. Finley will judge, kindly.',
    ],
    work: [
      'Close your eyes and picture Tom Hiddleston doing the shuffle. Let yourself smile at the sheer joy of it.',
    ],
  },
  {
    id: 'breaths', cat: 'oliver', extra: 'laser', prop: 'dot',
    title: 'Follow the dot', line: 'Three breaths, Oliver-approved.',
    any: [
      'Watch the dot. Breathe in as it rises, and out as it falls. Three times.',
    ],
  },
  {
    id: 'a-lot', cat: 'finley', done: 'I know',
    title: 'It’s a lot', line: 'You’re allowed to say so.',
    any: [
      'Finley never pretends things are fine when they aren’t. This is a lot. It makes sense that it’s hard, and you are carrying it anyway.',
      'You don’t have to feel okay to be doing okay. Both can be true today.',
      'Moving house, a hard job and school, all at once. Anyone would feel stretched. Go easy on the person doing all that.',
    ],
  },
  {
    id: 'lap', cat: 'madeline', prop: 'heart',
    title: 'Lap time', line: 'A hand where your heart is.',
    any: [
      'Put one hand on your chest. Feel it rise and fall three times. That is you, still here.',
      'Rest your hands in your lap, palms up, like you’re waiting for a cat to lay in them.',
    ],
  },
  {
    id: 'cat-cow', cat: 'oliver',
    title: 'Cat-cow', line: 'The mayor’s morning stretch.',
    home: [
      'Do what Oliver does after he’s been somewhere he shouldn’t: a slow cat-cow. On your hands and knees (or standing, hands on your thighs), round your back up, then let it dip. Three times. Nobody can stay mad at a stretch like that.',
    ],
    work: [
      'A seated cat-cow, Oliver-style. Sit near the edge of your chair, hands on your knees. Round your back as you breathe out, then arch it gently as you breathe in. Three times. Nobody can stay mad at a stretch like that.',
    ],
  },
  {
    id: 'sing', cat: 'finley', prop: 'notes',
    title: 'Sing it to the meowntains', line: 'One line, any song.',
    home: [
      'Sing one line of any song, out loud, at full Finley volume.',
      'Sing something to the cats. Finley will answer.',
    ],
    work: [
      'Hum one line of a song under your breath. Finley would want it louder, but this counts.',
    ],
  },
  {
    id: 'proud', cat: 'oliver', type: 'prompt',
    title: 'Something you’re proud of', line: 'Big, or very, very small.',
    asks: [
      'What’s one thing you’re proud of?',
      'What did you handle this week that deserves a little applause?',
      'What did you do today that no one noticed but you?',
    ],
  },
  {
    id: 'warm', cat: 'madeline',
    title: 'Something warm', line: 'Both hands.',
    home: [
      'Make something warm to drink, and hold it in both hands before the first sip.',
      'Put the softest blanket in the condo around your shoulders for a minute. See how many cats come find you.',
    ],
    work: [
      'If you have a warm drink, hold it in both hands before the next sip. If not, rub your palms together until they’re warm and rest them over your eyes.',
    ],
  },
  {
    id: 'no-jump', cat: 'madeline',
    title: 'You don’t have to jump', line: 'Some counters can wait.',
    any: [
      'Madeline can’t jump like her brothers, and she is perfectly loved anyway. Pick one thing that can wait until tomorrow, and let it.',
      'Not everything has to happen today. Name one thing that can be tomorrow’s problem.',
    ],
  },
  {
    id: 'credit', cat: 'finley', type: 'prompt',
    title: 'Credit where it’s due', line: 'The thing you never count.',
    asks: [
      'What’s one thing you don’t give yourself credit for?',
      'What do you do every day that would impress you if someone else did it?',
      'What’s hard right now that you’re doing anyway?',
    ],
  },
  {
    id: 'nest', cat: 'oliver',
    title: 'Build your nest', line: 'A little at a time.',
    home: [
      'Look around to see how far you’ve come. Your nest is further along than it looks.',
      'Put one thing where it belongs. Just one. That counts as unpacking.',
    ],
    work: [
      'Make one small corner of your desk feel like yours. Straighten it, clear it, or add something you love. A nest can start anywhere.',
    ],
  },
  {
    id: 'finding', cat: 'oliver', type: 'prompt',
    title: 'Finding people', line: 'Today, the person is you.',
    asks: [
      'You spend your days learning to find people. Take a minute to find yourself: what’s one thing that’s still true about you, however busy it gets?',
      'If you were tracing yourself back, what’s one clue that leads to the real you?',
      'What did you love at ten years old that you still love now?',
    ],
  },
  {
    id: 'shake', cat: 'finley', prop: 'feather',
    title: 'Shake it out', line: 'Like you just stepped in water.',
    any: [
      'Shake out your hands like they’re wet. Then your shoulders. Then let everything drop.',
      'Roll your shoulders back three times. Unclench your jaw. Let your tongue rest.',
    ],
  },
  {
    id: 'like-you', cat: 'madeline', type: 'prompt',
    title: 'Most like yourself', line: 'A clue to follow.',
    asks: [
      'When did you last feel most like yourself? What were you doing?',
      'What makes you laugh the hardest?',
      'What’s something small that always makes you feel a bit more like you?',
    ],
  },
  {
    id: 'rounds', cat: 'oliver',
    title: 'The mayor’s rounds', line: 'A short walk to check on things.',
    home: [
      'Walk down the hallway and back, slowly, the way Oliver inspects his territory.',
      'Take a lap of the condo. Say hello to one room.',
    ],
    work: [
      'Take a walk around the floor. No errand, just rounds.',
      'Walk to the far end of the floor and back. Notice one thing on the way.',
    ],
  },
  {
    id: 'kind', cat: 'finley', type: 'prompt',
    title: 'Words for a friend', line: 'Then keep them for yourself.',
    asks: [
      'What would you say to a friend carrying everything you’re carrying? Write it to yourself.',
      'What do you need to hear today? Say it to yourself here.',
    ],
  },
  {
    id: 'cats', cat: 'all', done: 'Love you too',
    title: 'From the cats', line: 'Official business.',
    any: [
      'You are the best cat mom. Three very spoiled witnesses agree.',
      'Oliver has inspected you and found everything in order.',
      'Finley would like it known, loudly, that you are his favorite.',
      'Madeline has saved you a spot on the blanket. She is waiting.',
    ],
  },
];

// Ash's notes. One of the cats brings one now and then, after a moment or a lantern.
// The first one she brings is always the first one here.
const NOTES = [
  { id: 'more', text: 'Love yourself as much as I love you. (More than you’ll ever know.)' },
  { id: 'deserve', text: 'You deserve love.' },
  { id: 'qualities', text: 'You gave me all my good qualities.' },
  { id: 'what-you-can', text: 'Do what you can with what you have.' },
  { id: 'best-mom', text: 'You are the best mom a daughter could ask for.' },
  { id: 'journey', text: 'You are on a journey that will reveal itself one step at a time.' },
  { id: 'resilient', text: 'You are resilient.' },
  { id: 'brighter', text: 'A brighter future awaits.' },
  { id: 'worth', text: 'Your job does not define your worth.' },
  { id: 'whale', text: 'If you need a chuckle, just think: breaching whale.' },
  { id: 'ka', text: 'K+A miss and love you!', sign: '' },
  { id: 'should', text: 'I dare you to eliminate “should” from your vocabulary for the next 10 minutes. No “I should do” anything. Just do what your body needs.' },
];

// How each cat delivers a note: Madeline brings it (she's the lap cat), Finley plays
// "go get" and fetches it, and Oliver drags it over the way he drags the feather toy.
const DELIVERIES = {
  madeline: 'Madeline brought you something',
  finley: 'Finley fetched you something',
  oliver: 'Oliver dragged something over',
};

// Shown after a moment, one at random.
const AFTER_MOMENT = [
  'That moment was all yours.',
  'Back to it, a little lighter.',
  'See? There was time after all.',
];
