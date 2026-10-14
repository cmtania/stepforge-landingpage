import weapons from './weapons.json';

// Set this to the App Store URL once the listing is live. While it is empty,
// every store button reads "Coming soon to the App Store" and is not a link.
export const APP_STORE_URL = '';

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const ELEMENTS = [
  { id: 'Fire', color: '#ff6a2b', icon: 'img/icon/fire.webp' },
  { id: 'Water', color: '#3ec5ff', icon: 'img/icon/water.webp' },
  { id: 'Wind', color: '#8fe39a', icon: 'img/icon/wind.webp' },
  { id: 'Earth', color: '#d79a5c', icon: 'img/icon/earth.webp' },
  { id: 'Lightning', color: '#ffd84a', icon: 'img/icon/lightning.webp' },
];
export const elementOf = (id) => ELEMENTS.find((e) => e.id === id);

export const RARITIES = [
  { id: 'Common', color: '#bdb6a8', icon: 'img/icon/common.webp' },
  { id: 'Uncommon', color: '#5ed68f', icon: 'img/icon/uncommon.webp' },
  { id: 'Rare', color: '#4fa8ff', icon: 'img/icon/rare.webp' },
  { id: 'Epic', color: '#bb7dff', icon: 'img/icon/epic.webp' },
  { id: 'Mythic', color: '#ffb43a', icon: 'img/icon/mythic.webp' },
];
export const rarityOf = (id) => RARITIES.find((r) => r.id === id);
export const rarityRank = (id) => RARITIES.findIndex((r) => r.id === id);

// Stepforge's daily chest ladder (design/daily-loot-mechanics.md).
// Odds are Common → Mythic, in percent, before any goal-streak bonus.
export const LADDER = [
  { from: 0, label: '0', best: 'Common', odds: [100, 0, 0, 0, 0] },
  { from: 2501, label: '2,501', best: 'Uncommon', odds: [70, 30, 0, 0, 0] },
  { from: 5001, label: '5,001', best: 'Rare', odds: [50, 32, 18, 0, 0] },
  { from: 7501, label: '7,501', best: 'Epic', odds: [38, 30, 22, 10, 0] },
  { from: 10000, label: '10,000', best: 'Mythic', odds: [30, 28, 24, 13, 5] },
];
export const tierFor = (steps) => [...LADDER].reverse().find((t) => steps >= t.from);

export const WEAPONS = weapons;
export const LOOT = weapons.filter((w) => !w.relic);
export const weaponById = (id) => weapons.find((w) => w.id === id);

export const NAV = [
  { id: 'game', label: 'The Game' },
  { id: 'forge', label: 'Forge' },
  { id: 'realms', label: 'Realms' },
  { id: 'disciples', label: 'Disciples' },
  { id: 'armory', label: 'Armory' },
  { id: 'pro', label: 'Pro' },
];

export const CHAPTERS = [
  {
    id: 'fire',
    numeral: 'Chapter I',
    title: 'The Last Ember',
    realm: 'The Ashen Foundry',
    element: 'Fire',
    scene: 'img/scene/ashen-foundry.webp',
    gem: 'img/gem/emberheart.webp',
    gemName: 'Emberheart',
    guardian: 'Varkath, the Ash Regent',
    access: 'Free to play · Varkath’s duel with Pro',
    text: 'Lava runs where the Foundry’s hearths once warmed every home. Walk its basalt roads, meet the four disciples bound to the Ash Regent, and carry the Emberheart out of the fire.',
  },
  {
    id: 'water',
    numeral: 'Chapter II',
    // Kept as a surprise on the landing page; shown only as a locked tab.
    locked: true,
    title: 'The Remembering Tide',
    realm: 'The Drowned Archive',
    element: 'Water',
    scene: 'img/scene/drowned-archive.webp',
    gem: 'img/gem/tideglass.webp',
    gemName: 'Tideglass',
    guardian: 'Nerith, the Tidebound Oracle',
    access: 'Included with Stepforge Pro',
    text: 'Under a cold moon, the Drowned Archive keeps every name the tide tried to wash away. Four disciples hold its flooded halls, and Nerith waits at the heart of the current.',
  },
];
export const SEALED = ['Earth', 'Wind', 'Lightning'];

const relic = (id) => weaponById(id);

export const DISCIPLES = {
  fire: {
    label: 'Ashen Foundry',
    element: 'Fire',
    scene: 'img/scene/basalt-bridge.webp',
    cast: [
      {
        id: 'cindrel',
        name: 'Cindrel',
        title: 'The Ember Scout',
        steps: 1200,
        image: 'img/char/cindrel.webp',
        relic: relic('fr01'),
        text: 'A hooded twin-blade messenger who guards the basalt bridge and the couriers who cross it after sunset.',
      },
      {
        id: 'brannok',
        name: 'Brannok',
        title: 'The Kiln Warden',
        steps: 3000,
        image: 'img/char/brannok.webp',
        relic: relic('fr02'),
        text: 'A heavy sentinel behind a kiln-door shield, keeping watch beneath the Foundry’s bell towers.',
      },
      {
        id: 'ilyra',
        name: 'Ilyra',
        title: 'The Cinder Weaver',
        steps: 5000,
        image: 'img/char/ilyra.webp',
        relic: relic('fr03'),
        text: 'A lantern-staff memory keeper who lights the names of every traveller in the hidden refuge.',
      },
      {
        id: 'rhazek',
        name: 'Rhazek',
        title: 'The Furnace Marshal',
        steps: 7000,
        image: 'img/char/rhazek.webp',
        relic: relic('fr04'),
        text: 'The split-flame halberd guardian of the forge gate, the last disciple before the Regent’s hall.',
      },
      {
        id: 'varkath',
        name: 'Varkath',
        title: 'The Ash Regent',
        steps: 10000,
        image: 'img/char/varkath.webp',
        guardian: true,
        framed: true,
        gem: { name: 'Emberheart', image: 'img/gem/emberheart.webp' },
        text: 'He once carried the Sunforge Greatblade and lit the hearth of every home in the Foundry. Then he accepted the Still King’s binding.',
      },
    ],
  },
  water: {
    label: 'Drowned Archive',
    locked: true,
    element: 'Water',
    scene: 'img/scene/tide-court.webp',
    cast: [
      {
        id: 'mirel',
        name: 'Mirel',
        title: 'Estuary Sentinel',
        steps: 1200,
        image: 'img/char/mirel.webp',
        relic: relic('wr01'),
        text: 'She traces the curve of the flooded gates where the Foundry’s river meets the sea, guiding stranded travellers home.',
      },
      {
        id: 'thalos',
        name: 'Thalos',
        title: 'Breakwater Keeper',
        steps: 3000,
        image: 'img/char/thalos.webp',
        relic: relic('wr02'),
        text: 'Every morning he measured the currents and drove the Archive’s floodgate pins against the sea.',
      },
      {
        id: 'seryn',
        name: 'Seryn',
        title: 'Memory Weaver',
        steps: 5000,
        image: 'img/char/seryn.webp',
        relic: relic('wr03'),
        text: 'She holds a single pearl from the Archive’s first tide pool, keeping lost voices safe until their owners return.',
      },
      {
        id: 'orrun',
        name: 'Orrun',
        title: 'Abyssal Warden',
        steps: 7000,
        image: 'img/char/orrun.webp',
        relic: relic('wr04'),
        text: 'Keeper of the deepest passage, sworn to remember the traveller and keep the road.',
      },
      {
        id: 'nerith',
        name: 'Nerith',
        title: 'The Tidebound Oracle',
        steps: 10000,
        image: 'img/char/nerith.webp',
        guardian: true,
        gem: { name: 'Tideglass', image: 'img/gem/tideglass.webp' },
        text: 'She once guided ships safely home with the Abyssal Tide Trident. Bound by the Still King, she now keeps the Archive under the tide.',
      },
    ],
  },
};

export const MOVES = [
  {
    id: 'strike',
    name: 'Strike',
    icon: 'img/icon/strike.webp',
    text: 'Hit hard when the binding is exposed and break its links.',
  },
  {
    id: 'brace',
    name: 'Brace',
    icon: 'img/icon/brace.webp',
    text: 'Weather an eruption and gather focus for what comes next.',
  },
  {
    id: 'resonate',
    name: 'Resonate',
    icon: 'img/icon/resonate.webp',
    text: 'Spend that focus at the heart to shatter the binding.',
  },
];

export const PRO_PERKS = [
  {
    icon: 'img/icon/pro-chests.webp',
    title: 'Bonus chests every day',
    text: 'One extra chest a day with Monthly, three with Lifetime. They use the same steps and the same odds as your daily chest.',
  },
  {
    icon: 'img/icon/pro-quest.webp',
    title: 'The full campaign',
    text: 'Duel Varkath for the Emberheart, then follow the road into Chapter II.',
  },
  {
    icon: 'img/icon/pro-widgets.webp',
    title: 'Home & Lock Screen widgets',
    text: 'Today’s steps and your chest’s progress, right on your iPhone without opening the app.',
  },
];
