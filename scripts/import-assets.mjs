// Copies artwork, sounds and weapon data from the Stepforge app repo into
// public/ and src/data/, resized and re-encoded for the web.
//
//   npm run assets [-- path/to/stepforge]   (default: ../stepforge)
//
// The output is committed, so CI never needs the app repo or this script.
import { readFile, writeFile, mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const appRepo = resolve(process.argv[2] ?? '../stepforge');
const res = join(appRepo, 'Stepforge/Resources');
const xc = join(res, 'Assets.xcassets');
const pub = resolve('public');

async function source(imageset) {
  const dir = join(xc, `${imageset}.${imageset === 'AppIcon' ? 'appiconset' : 'imageset'}`);
  const png = (await readdir(dir)).find((f) => f.endsWith('.png'));
  if (!png) throw new Error(`No PNG in ${dir}`);
  return join(dir, png);
}

async function webp(imageset, out, { width, height, quality = 78, alpha = false } = {}) {
  const dest = join(pub, 'img', `${out}.webp`);
  await sharp(await source(imageset))
    .resize({ width, height, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, alphaQuality: alpha ? 90 : 100, effort: 6, smartSubsample: true })
    .toFile(dest);
}

const scenes = {
  CampaignAshenFoundry: 'scene/ashen-foundry',
  CampaignDrownedArchive: 'scene/drowned-archive',
  CampaignTideCourt: 'scene/tide-court',
  CampaignVarkathHall: 'scene/varkath-hall',
  CampaignBasaltBridge: 'scene/basalt-bridge',
  OnboardingHeroPaceV2: 'scene/summit-path',
  OnboardingSunsetCallV2: 'scene/sunset-call',
  OnboardingRealmsPathV2: 'scene/realms-path',
  OnboardingFootstepPortalV2: 'scene/footstep-portal',
  OnboardingElementBridgeV2: 'scene/element-bridge',
  OnboardingWindJourneyV2: 'scene/wind-journey',
  OnboardingFireCaveChestV2: 'scene/fire-cave-chest',
  ProObservatoryBackground: 'scene/observatory',
  HomeSmithsForge: 'scene/smiths-forge',
  ForgeCrystalCave: 'scene/crystal-cave',
};

const characters = {
  CampaignCindrel: 'char/cindrel',
  CampaignBrannok: 'char/brannok',
  CampaignIlyra: 'char/ilyra',
  CampaignRhazek: 'char/rhazek',
  CampaignVarkath: 'char/varkath',
  CampaignMirel: 'char/mirel',
  CampaignThalos: 'char/thalos',
  CampaignSeryn: 'char/seryn',
  CampaignOrrun: 'char/orrun',
  CampaignNerith: 'char/nerith',
};

const objects = {
  ChestSilverClosed: 'chest/0-closed',
  ChestSilverSlightlyOpen: 'chest/1-slight',
  ChestSilverHalfOpen: 'chest/2-half',
  ChestSilverFullyOpen: 'chest/4-full',
  CampaignEmberheart: 'gem/emberheart',
  CampaignTideglass: 'gem/tideglass',
  StepforgeLogoMythicLightning: 'brand/sovereigns',
};

const icons = {
  DuelMoveStrike: 'icon/strike',
  DuelMoveBrace: 'icon/brace',
  DuelMoveResonate: 'icon/resonate',
  FilterElementFire: 'icon/fire',
  FilterElementWater: 'icon/water',
  FilterElementWind: 'icon/wind',
  FilterElementEarth: 'icon/earth',
  FilterElementLightning: 'icon/lightning',
  FilterRarityCommon: 'icon/common',
  FilterRarityUncommon: 'icon/uncommon',
  FilterRarityRare: 'icon/rare',
  FilterRarityEpic: 'icon/epic',
  FilterRarityMythic: 'icon/mythic',
  ProChestIconV2: 'icon/pro-chests',
  ProQuestIconV2: 'icon/pro-quest',
  ProWidgetsIconV2: 'icon/pro-widgets',
};

const sounds = [
  'epic-adventure.mp3',
  'forge-strike-01.wav',
  'forge-strike-02.wav',
  'forge-final-01.wav',
  'weapon-reveal.wav',
];

await rm(join(pub, 'img'), { recursive: true, force: true });
for (const d of ['scene', 'char', 'chest', 'gem', 'brand', 'icon', 'card']) {
  await mkdir(join(pub, 'img', d), { recursive: true });
}
await mkdir(join(pub, 'audio'), { recursive: true });
await mkdir(resolve('src/assets/fonts'), { recursive: true });
await mkdir(resolve('src/data'), { recursive: true });

const jobs = [];
for (const [k, v] of Object.entries(scenes)) jobs.push(webp(k, v, { width: 1024, quality: 74 }));
for (const [k, v] of Object.entries(characters)) jobs.push(webp(k, v, { height: 1100, quality: 80, alpha: true }));
for (const [k, v] of Object.entries(objects)) jobs.push(webp(k, v, { width: 720, quality: 82, alpha: true }));
for (const [k, v] of Object.entries(icons)) jobs.push(webp(k, v, { width: 240, quality: 84, alpha: true }));

// Weapons: the 61 daily-loot weapons plus the 8 story relics, with chronicles.
const read = async (f) => JSON.parse(await readFile(join(res, f), 'utf8'));
const unwrap = (j) => (Array.isArray(j) ? j : Object.values(j)[0]);
const catalog = [
  ...unwrap(await read('Weapons.json')),
  ...unwrap(await read('FireRelics.json')),
  ...unwrap(await read('WaterRelics.json')),
];
const chronicles = new Map();
for (const f of ['WeaponChronicles.json', 'FireRelicChronicles.json', 'WaterRelicChronicles.json']) {
  for (const c of unwrap(await read(f))) chronicles.set(c.weaponID, c);
}
const weapons = catalog.map((w) => {
  const c = chronicles.get(w.id) ?? {};
  jobs.push(webp(w.assetName, `card/${w.id}`, { width: 560, quality: 74 }));
  return {
    id: w.id,
    number: w.number,
    name: w.name,
    type: w.type,
    rarity: w.rarity,
    element: w.element,
    attack: w.attack,
    power: w.powerName,
    powerText: w.powerDescription,
    origin: c.origin ?? null,
    relic: w.number > 61,
  };
});

jobs.push(
  sharp(await source('AppIcon'))
    .resize(512)
    .png({ compressionLevel: 9 })
    .toFile(join(pub, 'app-icon.png')),
  sharp(await source('AppIcon'))
    .resize(64)
    .png()
    .toFile(join(pub, 'favicon.png')),
  sharp(await source('OnboardingHeroPaceV2'))
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(pub, 'og-image.jpg')),
);
for (const s of sounds) jobs.push(copyFile(join(res, 'Audio', s), join(pub, 'audio', s)));
jobs.push(copyFile(join(res, 'Fonts/MedievalSharp.ttf'), resolve('src/assets/fonts/MedievalSharp.ttf')));
jobs.push(copyFile(join(res, 'Fonts/OFL.txt'), resolve('src/assets/fonts/MedievalSharp-OFL.txt')));

await Promise.all(jobs);
await writeFile(resolve('src/data/weapons.json'), JSON.stringify(weapons, null, 1) + '\n');
console.log(`Imported ${jobs.length} files and ${weapons.length} weapons from ${appRepo}`);
