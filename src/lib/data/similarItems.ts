import { dyedItems } from '../dyedItems';
import { allMasterCapesBank } from '../skilling/skillcapes';
import itemID from '../util/itemID';
import resolveItems from '../util/resolveItems';
import {
	gracefulCapes,
	gracefulFeet,
	gracefulHands,
	gracefulHoods,
	gracefulLegs,
	gracefulTops
} from './gracefulVariants';

const scytheChargedSimilar = ['Holy scythe of vitur', 'Sanguine scythe of vitur'];
const scytheUnchargedSimilar = ['Holy scythe of vitur (uncharged)', 'Sanguine scythe of vitur (uncharged)'];

const blackMaskISimilar = resolveItems([
	'Black mask (10) (i)',
	'Black mask (9) (i)',
	'Black mask (8) (i)',
	'Black mask (7) (i)',
	'Black mask (6) (i)',
	'Black mask (5) (i)',
	'Black mask (4) (i)',
	'Black mask (3) (i)',
	'Black mask (2) (i)',
	'Black mask (1) (i)'
]);
const slayerHelmSimilar = resolveItems([
	'Slayer helmet',
	'Black slayer helmet',
	'Green slayer helmet',
	'Red slayer helmet',
	'Purple slayer helmet',
	'Turquoise slayer helmet',
	'Hydra slayer helmet',
	'Twisted slayer helmet',
	'Infernal slayer helmet',
	'Tztok slayer helmet',
	'Vampyric slayer helmet',
	'Tzkal slayer helmet'
]);
const slayerHelmSimilarI = resolveItems([
	'Black slayer helmet (i)',
	'Green slayer helmet (i)',
	'Red slayer helmet (i)',
	'Purple slayer helmet (i)',
	'Turquoise slayer helmet (i)',
	'Hydra slayer helmet (i)',
	'Twisted slayer helmet (i)',
	'Slayer helmet (i)',
	'Infernal slayer helmet(i)',
	'Tztok slayer helmet (i)',
	'Vampyric slayer helmet (i)',
	'Tzkal slayer helmet (i)'
]);
const bowfaCorruptSimilar = resolveItems([
	25_869, // Red, 'duplicate' according to osrsbox item-search
	25_884, // White
	25_886, // Black
	25_888, // Brown?
	25_890, // Green
	25_892, // Yellow
	25_894, // Light blue
	25_896 // Dark blue
]);
const fellingAxe = resolveItems([
	'Bronze felling axe',
	'Iron felling axe',
	'Steel felling axe',
	'Black felling axe',
	'Mithril felling axe',
	'Adamant felling axe',
	'Rune felling axe',
	'Dragon felling axe',
	'Crystal felling axe',
	'3rd age felling axe'
]);

const source: [string, (string | number)[]][] = [
	['Bronze felling axe', fellingAxe],
	['Bronze axe', ['Bronze felling axe']],
	['Iron axe', ['Iron felling axe']],
	['Steel axe', ['Steel felling axe']],
	['Black axe', ['Black felling axe']],
	['Mithril axe', ['Mithril felling axe']],
	['Adamant axe', ['Adamant felling axe']],
	['Rune axe', ['Rune felling axe', 'Gilded axe']],
	['Dragon axe', ['Dragon felling axe', '3rd age axe', '3rd age felling axe']],
	['Crystal axe', ['Crystal felling axe']],
	['Rune pickaxe', ['Gilded pickaxe']],
	['Dragon full helm', ['Dragon full helm (g)']],
	['Dragon chainbody', ['Dragon chainbody (g)']],
	['Dragon platebody', ['Dragon platebody (g)']],
	['Dragon platelegs', ['Dragon platelegs (g)']],
	['Dragon plateskirt', ['Dragon plateskirt (g)']],
	['Dragon sq shield', ['Dragon sq shield (g)']],
	['Dragon kiteshield', ['Dragon kiteshield (g)']],
	['Dragon scimitar', ['Dragon scimitar (or)']],
	['Dragon defender', ['Dragon defender (t)', 'Dragon defender (l)']],
	['Dragon boots', ['Dragon boots (g)']],
	['Armadyl godsword', ['Armadyl godsword (or)']],
	['Bandos godsword', ['Bandos godsword (or)']],
	['Saradomin godsword', ['Saradomin godsword (or)']],
	['Zamorak godsword', ['Zamorak godsword (or)']],
	['Infinity hat', ['Dark infinity hat', 'Light infinity hat']],
	['Infinity top', ['Dark infinity top', 'Light infinity top']],
	['Infinity bottoms', ['Dark infinity bottoms', 'Light infinity bottoms']],
	['Ancestral hat', ['Twisted ancestral hat']],
	['Ancestral robe top', ['Twisted ancestral robe top']],
	['Ancestral robe bottom', ['Twisted ancestral robe bottom']],
	['Tzhaar-ket-om', ['Tzhaar-ket-om (t)']],
	['Berserker necklace', ['Berserker necklace (or)']],
	['Amulet of fury', ['Amulet of fury (or)', 'Amulet of blood fury']],
	['Amulet of torture', ['Amulet of torture (or)']],
	['Tormented bracelet', ['Tormented bracelet (or)']],
	['Necklace of anguish', ['Necklace of anguish (or)']],
	['Occult necklace', ['Occult necklace (or)']],
	['Dragon hunter crossbow', ['Dragon hunter crossbow (t)', 'Dragon hunter crossbow (b)']],
	['Armadyl crossbow', ['Zaryte crossbow']],
	['Dragon pickaxe', ['Dragon pickaxe(or)', 12_797, '3rd age pickaxe', 'Infernal pickaxe']],
	['Steam battlestaff', [12_795]],
	['Lava battlestaff', [21_198]],
	['Odium ward', [12_807]],
	['Malediction ward', [12_806]],
	['Dark bow', [12_765, 12_766, 12_767, 12_768]],
	['Abyssal whip', ['Volcanic abyssal whip', 'Frozen abyssal whip', 'Abyssal tentacle']],
	['Abyssal tentacle', ['Abyssal tentacle (or)']],
	['Granite maul', [12_848]],
	['Rune scimitar', [23_330, 23_332, 23_334]],
	[
		"Black d'hide body",
		[
			"Black d'hide body (g)",
			"Black d'hide body (t)",
			"Guthix d'hide body",
			"Saradomin d'hide body",
			"Zamorak d'hide body",
			"Armadyl d'hide body",
			"Ancient d'hide body",
			"Bandos d'hide body"
		]
	],
	[
		"Black d'hide chaps",
		[
			"Black d'hide chaps (g)",
			"Black d'hide chaps (t)",
			'Guthix chaps',
			'Saradomin chaps',
			'Zamorak chaps',
			'Armadyl chaps',
			'Ancient chaps',
			'Bandos chaps'
		]
	],
	[
		"Guthix d'hide boots",
		[
			"Saradomin d'hide boots",
			"Zamorak d'hide boots",
			"Armadyl d'hide boots",
			"Ancient d'hide boots",
			"Bandos d'hide boots"
		]
	],
	[
		'Amulet of glory',
		[
			'Amulet of glory (1)',
			'Amulet of glory (2)',
			'Amulet of glory (3)',
			'Amulet of glory (4)',
			'Amulet of glory (5)',
			'Amulet of glory (6)',
			'Amulet of glory (t)',
			'Amulet of glory (t1)',
			'Amulet of glory (t2)',
			'Amulet of glory (t3)',
			'Amulet of glory (t4)',
			'Amulet of glory (t5)',
			'Amulet of glory (t6)',
			'Amulet of eternal glory'
		]
	],
	['Graceful hood', gracefulHoods],
	['Graceful top', gracefulTops],
	['Graceful legs', gracefulLegs],
	['Graceful gloves', gracefulHands],
	['Graceful boots', gracefulFeet],
	['Graceful cape', gracefulCapes],
	['Fire cape', ['Fire max cape', 'Fire max cape (l)']],
	['Infernal cape', ['Infernal max cape', 'Infernal max cape (l)', 'TzKal cape']],
	['Ardougne cloak 4', ['Ardougne max cape']],
	["Ava's accumulator", ['Accumulator max cape', 'Tidal collector']],
	['Mythical cape', ['Mythical max cape']],
	['Achievement diary cape', ['Achievement diary cape(t)']],
	[
		'Imbued guthix cape',
		[
			'Imbued guthix max cape',
			'Imbued guthix max cape (l)',
			'Imbued saradomin cape',
			'Imbued saradomin max cape',
			'Imbued saradomin max cape (l)',
			'Imbued zamorak cape',
			'Imbued zamorak max cape',
			'Imbued zamorak max cape (l)'
		]
	],
	['Guthix cape', ['Saradomin cape', 'Zamorak cape', 'Guthix max cape', 'Saradomin max cape', 'Zamorak max cape']],
	['Dragonfire ward', [22_003]],
	['Dragonfire shield', [11_284]],
	['Ancient wyvern shield', [21_634]],
	['Avernic defender', ['Avernic defender (l)', "Ghommal's avernic defender 5", "Ghommal's avernic defender 6"]],
	['Void melee helm', ['Void melee helm (l)', 'Void melee helm (or)']],
	['Void mage helm', ['Void mage helm (l)', 'Void mage helm (or)']],
	['Void ranger helm', ['Void ranger helm (l)', 'Void ranger helm (or)']],
	[
		'Void knight top',
		['Void knight top (l)', 'Void knight top (or)', 'Elite void top', 'Elite void top (l)', 'Elite void top (or)']
	],
	[
		'Void knight robe',
		[
			'Void knight robe (l)',
			'Void knight robe (or)',
			'Elite void robe',
			'Elite void robe (l)',
			'Elite void robe (or)'
		]
	],
	['Elite void top', ['Elite void top (l)', 'Elite void top (or)']],
	['Elite void robe', ['Elite void robe (l)', 'Elite void robe (or)']],
	['Void knight gloves', ['Void knight gloves (l)', 'Void knight gloves (or)']],
	['Trident of the seas', ['Trident of the seas (full)', 'Trident of the seas (e)']],
	['Trident of the swamp', ['Trident of the swamp (e)']],
	['Bow of faerdhinen (c)', bowfaCorruptSimilar],
	['Slayer helmet', slayerHelmSimilar],
	['Slayer helmet (i)', slayerHelmSimilarI],
	['Black mask (i)', [...slayerHelmSimilarI, ...blackMaskISimilar]],
	[
		'Black mask',
		[
			...blackMaskISimilar,
			...slayerHelmSimilarI,
			...slayerHelmSimilar,
			...[
				'Black mask (i)',
				'Black mask (1)',
				'Black mask (2)',
				'Black mask (3)',
				'Black mask (4)',
				'Black mask (5)',
				'Black mask (6)',
				'Black mask (7)',
				'Black mask (8)',
				'Black mask (9)',
				'Black mask (10)'
			]
		]
	],
	['Slayer cape', ['Slayer cape (t)']],
	['Nose peg', slayerHelmSimilar],
	['Earmuffs', slayerHelmSimilar],
	['Spiny helmet', slayerHelmSimilar],
	['Facemask', slayerHelmSimilar],
	['Reinforced goggles', slayerHelmSimilar],
	['Anti-dragon shield', [11_284, 11_283, 21_633, 21_634, 22_003, 22_002]],
	[
		'Staff of water',
		[
			'Mist battlestaff',
			'Mystic mist staff',
			'Tome of water (empty)',
			'Tome of water',
			'Kodai wand',
			'Water battlestaff',
			'Mystic water staff',
			'Steam battlestaff',
			'Mystic steam staff',
			'Mud battlestaff',
			'Mystic mud staff',
			'Virtus wand',
			'Void staff',
			'Void staff (u)'
		]
	],
	['Attack cape', ['Max cape', 'Attack cape(t)']],
	['Farming cape', ['Max cape', 'Farming cape(t)']],
	['Agility master cape', ['Support cape']],
	['Dungeoneering master cape', ['Support cape']],
	['Thieving master cape', ['Support cape']],
	['Slayer master cape', ['Support cape']],
	['Farming master cape', ["Gatherer's cape"]],
	['Fishing master cape', ["Gatherer's cape"]],
	['Hunter master cape', ["Gatherer's cape"]],
	['Mining master cape', ["Gatherer's cape"]],
	['Woodcutting master cape', ["Gatherer's cape"]],
	['Divination master cape', ["Gatherer's cape"]],
	['Attack master cape', ["Combatant's cape"]],
	['Hitpoints master cape', ["Combatant's cape"]],
	['Defence master cape', ["Combatant's cape"]],
	['Magic master cape', ["Combatant's cape"]],
	['Prayer master cape', ["Combatant's cape"]],
	['Ranged master cape', ["Combatant's cape"]],
	['Strength master cape', ["Combatant's cape"]],
	[
		"Ava's assembler",
		[
			"Combatant's cape",
			'Assembler max cape',
			'Ranged master cape',
			'Assembler max cape (l)',
			'Masori assembler',
			'Masori assembler max cape',
			'Tidal collector'
		]
	],
	['Crafting master cape', ["Artisan's cape"]],
	['Construction master cape', ["Artisan's cape"]],
	['Cooking master cape', ["Artisan's cape"]],
	['Firemaking master cape', ["Artisan's cape"]],
	['Fletching master cape', ["Artisan's cape"]],
	['Herblore master cape', ["Artisan's cape"]],
	['Runecraft master cape', ["Artisan's cape"]],
	['Smithing master cape', ["Artisan's cape"]],
	['Torva full helm', ['Gorajan warrior helmet', 'Infernal slayer helmet(i)']],
	['Torva platebody', ['Gorajan warrior top']],
	['Torva platelegs', ['Gorajan warrior legs']],
	['Torva gloves', ['Gorajan warrior gloves']],
	['Torva boots', ['Gorajan warrior boots']],
	['Virtus mask', ['Gorajan occult helmet', 'Infernal slayer helmet(i)']],
	['Virtus robe top', ['Gorajan occult top']],
	['Virtus robe legs', ['Gorajan occult legs']],
	['Virtus gloves', ['Gorajan occult gloves']],
	['Virtus boots', ['Gorajan occult boots']],
	['Pernix cowl', ['Gorajan archer helmet', 'Infernal slayer helmet(i)']],
	['Pernix body', ['Gorajan archer top']],
	['Pernix chaps', ['Gorajan archer legs']],
	['Pernix gloves', ['Gorajan archer gloves']],
	['Pernix boots', ['Gorajan archer boots']],
	['Abyssal cape', ['Vasa cloak', 'TzKal cape', 'Tidal collector']],
	['Ivandis flail', ['Blisterwood flail']],
	['Angler hat', ['Spirit angler headband', 'Fishing hat']],
	['Angler top', ['Spirit angler top', 'Fishing jacket']],
	['Angler waders', ['Spirit angler waders', 'Fishing waders']],
	['Angler boots', ['Spirit angler boots', 'Fishing boots']],
	['Flippers', ['Dark flippers']],
	[
		'Merfolk trident',
		[
			'Trident of the seas (full)',
			'Trident of the seas',
			'Uncharged trident',
			'Trident of the seas (e)',
			'Uncharged trident (e)',
			'Trident of the swamp',
			'Uncharged toxic trident',
			'Trident of the swamp (e)',
			'Uncharged toxic trident (e)'
		]
	],
	['Ghrazi rapier', ['Holy ghrazi rapier']],
	['Scythe of vitur', ['Sanguine scythe of vitur', 'Holy scythe of vitur']],
	['Scythe of vitur (uncharged)', ['Sanguine scythe of vitur (uncharged)', 'Holy scythe of vitur (uncharged)']],
	['Sanguinesti staff', ['Holy sanguinesti staff']],
	['Sanguinesti staff (uncharged)', ['Holy sanguinesti staff (uncharged)']],
	['Runecraft cape', ['Max cape', 'Runecraft cape(t)']],
	['Agility cape', ['Max cape', 'Agility cape(t)']],
	['Attack cape', ['Max cape', 'Attack cape(t)']],
	['Construct. cape', ['Max cape', 'Construct. cape(t)']],
	['Cooking cape', ['Max cape', 'Cooking cape(t)']],
	['Crafting cape', ['Max cape', 'Crafting cape(t)']],
	['Defence cape', ['Max cape', 'Defence cape(t)']],
	['Farming cape', ['Max cape', 'Farming cape(t)']],
	['Firemaking cape', ['Max cape', 'Firemaking cape(t)']],
	['Fishing cape', ['Max cape', 'Fishing cape(t)']],
	['Fletching cape', ['Max cape', 'Fletching cape(t)']],
	['Herblore cape', ['Max cape', 'Herblore cape(t)']],
	['Hitpoints cape', ['Max cape', 'Hitpoints cape(t)']],
	['Hunter cape', ['Max cape', 'Hunter cape(t)']],
	['Magic cape', ['Max cape', 'Magic cape(t)']],
	['Mining cape', ['Max cape', 'Mining cape(t)']],
	['Prayer cape', ['Max cape', 'Prayer cape(t)']],
	['Ranging cape', ['Max cape', 'Ranging cape(t)']],
	['Runecraft cape', ['Max cape', 'Runecraft cape(t)']],
	['Slayer cape', ['Max cape', 'Slayer cape(t)']],
	['Smithing cape', ['Max cape', 'Smithing cape(t)']],
	['Strength cape', ['Max cape', 'Strength cape(t)']],
	['Thieving cape', ['Max cape', 'Thieving cape(t)']],
	['Woodcutting cape', ['Max cape', 'Woodcut. cape(t)']],
	['Salve amulet', ['Salve amulet(ei)', 'Salve amulet(i)', 'Salve amulet (e)']],
	['Salve amulet (e)', ['Salve amulet(ei)']],
	['Salve amulet(i)', ['Salve amulet(ei)']],
	['Zaryte bow', ['Hellfire bow']],
	['Twisted bow', ['Hellfire bow']],
	['Gorajan archer helmet', ['Infernal slayer helmet(i)']],
	['Gorajan occult helmet', ['Infernal slayer helmet(i)']],
	['Gorajan warrior helmet', ['Infernal slayer helmet(i)']],
	['Ring of suffering (i)', ['Ring of suffering (ri)']],
	['Scythe of vitur', [...scytheChargedSimilar]],
	['Scythe of vitur (uncharged)', [...scytheUnchargedSimilar]],
	['Sanguinesti staff', ['Holy sanguinesti staff']],
	['Sanguinesti staff (uncharged)', ['Holy sanguinesti staff (uncharged)']],
	['Contest rod', ['Crystal fishing rod']],
	[
		"Beginner's tackle box",
		['Basic tackle box', 'Standard tackle box', 'Professional tackle box', "Champion's tackle box"]
	],
	['Magic shortbow', ['Magic shortbow (i)']],
	['Boots of stone', ['Boots of brimstone', 'Granite boots', "Rada's Blessing 4"]],
	['Celestial ring (uncharged)', ['Celestial signet', 'Celestial ring', 'Celestial signet (uncharged)']],
	['Celestial ring', ['Celestial signet']],
	['Celestial signet (uncharged)', ['Celestial signet']],
	['Kodai wand', ['Virtus wand', 'Void staff', 'Void staff (u)']],
	['Virtus wand', ['Void staff', 'Void staff (u)']],
	['Virtus book', ['Abyssal tome']],
	['Prospector jacket', ['Golden prospector jacket', 'Varrock armour 4']],
	['Prospector legs', ['Golden prospector legs']],
	['Prospector boots', ['Golden prospector boots']],
	['Prospector helmet', ['Golden prospector helmet']],
	['Hat of the eye', ['Hat of the eye (red)', 'Hat of the eye (green)', 'Hat of the eye (blue)']],
	['Robe top of the eye', ['Robe top of the eye (red)', 'Robe top of the eye (green)', 'Robe top of the eye (blue)']],
	[
		'Robe bottoms of the eye',
		['Robe bottoms of the eye (red)', 'Robe bottoms of the eye (green)', 'Robe bottoms of the eye (blue)']
	],
	["Osmumten's fang", ["Osmumten's fang (or)"]],
	["Elidinis' ward (f)", ["Elidinis' ward (or)"]],
	['Rune pouch', ['Divine rune pouch']],
	['Ghrazi rapier', ['Holy ghrazi rapier']],
	["Inventors' backpack", ['Invention master cape']],
	['Ignis ring', ['Ignis ring (i)']],
	['Ring of piercing', ['Ring of piercing (i)']],
	// Inventions
	['Inferno adze', ['Superior inferno adze']],
	['Gorajan bonecrusher', ['Superior bonecrusher']],
	['Magic secateurs', ['Arcane harvester']],
	["Karil's coif", ['Armadyl helmet', 'Masori mask (f)', 'Masori mask']],
	["Karil's leathertop", ['Armadyl chestplate', 'Masori body (f)', 'Masori body']],
	["Karil's leatherskirt", ['Armadyl chainskirt', 'Masori chaps (f)', 'Masori chaps']],
	['Armadyl helmet', ['Masori mask (f)', 'Masori mask']],
	['Armadyl chestplate', ['Armadyl chestplate', 'Masori body (f)', 'Masori body']],
	['Armadyl chainskirt', ['Masori chaps (f)', 'Masori chaps']],
	['Music cape', ['Music cape (t)']],
	['Imbued heart', ['Saturated heart']],
	["Craw's bow", ['Webweaver bow']],
	["Viggora's chainmace", ['Ursine chainmace']],
	["Thammaron's sceptre", ['Accursed sceptre']],
	['Lumberjack hat', ['Forestry hat']],
	['Lumberjack top', ['Forestry top']],
	['Lumberjack legs', ['Forestry legs']],
	['Lumberjack boots', ['Forestry boots']],
<<<<<<< HEAD
	['Log basket', ['Forestry basket']],
	['Forestry kit', ['Forestry basket']]
=======
	['Abyssal jibwings', ['Abyssal jibwings (e)']],
	['3rd age jibwings', ['3rd age jibwings (e)']],
	['Demonic jibwings', ['Demonic jibwings (e)']],

	['Completionist cape', ['Completionist cape (t)']],
	["Combatant's cape", ['Completionist cape', 'Completionist cape (t)']],
	["Gatherer's cape", ['Completionist cape', 'Completionist cape (t)']],
	['Support cape', ['Completionist cape', 'Completionist cape (t)']],
	["Artisan's cape", ['Completionist cape', 'Completionist cape (t)']]
>>>>>>> bsopet
];

// Make max cape count as all master capes
for (const [cape] of allMasterCapesBank.items()) {
	const existingSimilarItem = source.find(s => s[0] === cape.name);
	if (existingSimilarItem) {
		existingSimilarItem[1].push('Completionist cape', 'Completionist cape (t)');
	} else {
		source.push([cape.name, ['Completionist cape', 'Completionist cape (t)']]);
	}
}

for (const { baseItem, dyedVersions } of dyedItems) {
	// Update matching child rows (simmilarItems) first:
	const matchingChildren = source.filter(s => s[1].includes(baseItem.name));

	if (matchingChildren.length > 0) {
		for (const matchingRow of matchingChildren) {
			// Check children (simmilarItems) for dyed variants and add those:
			for (const subSimilarItem of matchingRow[1]) {
				const dyedVariant = dyedItems.find(i => i.baseItem.name === subSimilarItem);
				if (dyedVariant) {
					matchingRow[1].push(...dyedVariant.dyedVersions.map(i => i.item.id));
				}
			}
		}
	}

	// Check for existing record and update it, otherwise it would be overwritten.
	const existingRoot = source.find(s => s[0] === baseItem.name);
	if (existingRoot) {
		// Update existing root entry:
		existingRoot[1].push(...dyedVersions.map(i => i.item.id));
	} else {
		// ...Or create a new entry:
		source.push([baseItem.name, dyedVersions.map(i => i.item.id)]);
	}
}

export const similarItems: Map<number, number[]> = new Map(
	source.map(entry => [itemID(entry[0]), resolveItems(entry[1])])
);

export const inverseSimilarItems: Map<number, Set<number>> = new Map();
for (const [baseItem, similarItems] of source) {
	for (const item of resolveItems(similarItems)) {
		if (!inverseSimilarItems.get(item)) {
			inverseSimilarItems.set(item, new Set());
		}
		inverseSimilarItems.get(item)!.add(itemID(baseItem));
	}
}

export function getSimilarItems(itemID: number): number[] {
	const similars = similarItems.get(itemID);
	return similars ? [itemID, ...similars] : [itemID];
}
