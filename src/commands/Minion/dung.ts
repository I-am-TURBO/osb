import { reduceNumByPercent, Time } from 'e';
import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';

import { Emoji } from '../../lib/constants';
import { minionNotBusy, requiresMinion } from '../../lib/minions/decorators';
import { UserSettings } from '../../lib/settings/types/UserSettings';
import { SkillsEnum } from '../../lib/skilling/types';
import { BotCommand } from '../../lib/structures/BotCommand';
import { MakePartyOptions } from '../../lib/types';
import { ActivityTaskOptions } from '../../lib/types/minions';
import { formatDuration, formatSkillRequirements, skillsMeetRequirements, stringMatches } from '../../lib/util';
import addSubTaskToActivityTask from '../../lib/util/addSubTaskToActivityTask';
import { formatOrdinal } from '../../lib/util/formatOrdinal';
import getOSItem from '../../lib/util/getOSItem';
import itemID from '../../lib/util/itemID';
import { gorajanShardChance, numberOfGorajanOutfitsEquipped } from '../../tasks/minions/dungeoneeringActivity';

export type Floor = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function isValidFloor(floor: number | string): floor is Floor {
	return [1, 2, 3, 4, 5, 6, 7].includes(floor as number);
}

export interface DungeoneeringOptions extends ActivityTaskOptions {
	leader: string;
	users: string[];
	quantity: number;
	floor: number;
}

const dungBuyables = [
	{
		item: getOSItem('Chaotic rapier'),
		cost: 200_000
	},
	{
		item: getOSItem('Chaotic longsword'),
		cost: 200_000
	},
	{
		item: getOSItem('Chaotic maul'),
		cost: 200_000
	},
	{
		item: getOSItem('Chaotic staff'),
		cost: 200_000
	},
	{
		item: getOSItem('Chaotic crossbow'),
		cost: 200_000
	},
	{
		item: getOSItem('Offhand Chaotic rapier'),
		cost: 100_000
	},
	{
		item: getOSItem('Offhand Chaotic longsword'),
		cost: 100_000
	},
	{
		item: getOSItem('Offhand Chaotic crossbow'),
		cost: 100_000
	},
	{
		item: getOSItem('Farseer kiteshield'),
		cost: 200_000
	},
	{
		item: getOSItem('Scroll of life'),
		cost: 400_000
	},
	{
		item: getOSItem('Herbicide'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of efficiency'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of farming'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of cleansing'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of dexterity'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of teleportation'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of mystery'),
		cost: 500_000
	},
	{
		item: getOSItem('Amulet of zealots'),
		cost: 400_000
	},
	{
		item: getOSItem('Scroll of proficiency'),
		cost: 900_000
	},
	{
		item: getOSItem('Frosty'),
		cost: 2_000_000
	},
	{
		item: getOSItem('Chaotic remnant'),
		cost: 500_000
	},
	{
		item: getOSItem('Scroll of longevity'),
		cost: 800_000
	},
	{
		item: getOSItem('Scroll of the hunt'),
		cost: 800_000
	},
	{
		item: getOSItem('Daemonheim agility pass'),
		cost: 1_000_000
	},
	{
		item: getOSItem('Dungeoneering dye'),
		cost: 4_000_000
	}
];

function determineDgLevelForFloor(floor: number) {
	return Math.floor(floor * 20 - 20);
}

function requiredLevel(floor: number) {
	return floor * 14;
}

function requiredSkills(floor: number) {
	const lvl = requiredLevel(floor);
	const nonCmbLvl = Math.floor(lvl / 1.5);
	return {
		attack: lvl,
		strength: lvl,
		defence: lvl,
		hitpoints: lvl,
		magic: lvl,
		ranged: lvl,
		herblore: nonCmbLvl,
		runecraft: nonCmbLvl,
		prayer: nonCmbLvl,
		fletching: nonCmbLvl,
		fishing: nonCmbLvl,
		cooking: nonCmbLvl,
		construction: nonCmbLvl,
		crafting: nonCmbLvl,
		dungeoneering: determineDgLevelForFloor(floor)
	};
}

function hasRequiredLevels(user: KlasaUser, floor: number) {
	return skillsMeetRequirements(user.rawSkills, requiredSkills(floor));
}

export function maxFloorUserCanDo(user: KlasaUser) {
	return [7, 6, 5, 4, 3, 2, 1].find(floor => hasRequiredLevels(user, floor)) || 1;
}

// Max people in a party:
const maxTeamSize = 20;
// Limit party size boost to maxBoostSize * boostPerPlayer:
const maxBoostSize = 5;
const boostPerPlayer = 5;

export default class extends BotCommand {
	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			oneAtTime: true,
			altProtection: true,
			categoryFlags: ['minion', 'pvm', 'minigame'],
			subcommands: true,
			usage: '[start|buy] [floor:int{1,7}|name:...string]',
			usageDelim: ' ',
			aliases: ['dg']
		});
	}

	@requiresMinion
	async run(msg: KlasaMessage) {
		let str = `<:dungeoneeringToken:829004684685606912> **Dungeoneering Tokens:** ${msg.author.settings
			.get(UserSettings.DungeoneeringTokens)
			.toLocaleString()}
**Max floor:** ${maxFloorUserCanDo(msg.author)}`;
		const { boosts } = gorajanShardChance(msg.author);
		if (boosts.length > 0) {
			str += `\n**Gorajan shard boosts:** ${boosts.join(', ')}`;
		}
		return msg.channel.send(str);
	}

	async buy(msg: KlasaMessage, [input = '']: [string]) {
		if (typeof input === 'number') input = '';
		const buyable = dungBuyables.find(i => stringMatches(input, i.item.name));
		if (!buyable) {
			return msg.channel.send(
				`That isn't a buyable item. Here are the items you can buy: \n\n${dungBuyables
					.map(i => `**${i.item.name}:** ${i.cost.toLocaleString()} tokens`)
					.join('\n')}.`
			);
		}

		const { item, cost } = buyable;
		const balance = msg.author.settings.get(UserSettings.DungeoneeringTokens);
		if (balance < cost) {
			return msg.channel.send(
				`You don't have enough Dungeoneering tokens to buy the ${
					item.name
				}. You need ${cost.toLocaleString()}, but you have only ${balance.toLocaleString()}.`
			);
		}

		await msg.author.settings.update(UserSettings.DungeoneeringTokens, balance - cost);
		await msg.author.addItemsToBank({ [item.id]: 1 }, true);

		return msg.channel.send(
			`Successfully purchased 1x ${item.name} for ${cost.toLocaleString()} Dungeoneering tokens.`
		);
	}

	@minionNotBusy
	@requiresMinion
	async start(msg: KlasaMessage, [floor]: [number | string | undefined]) {
		let floorToDo = Boolean(floor)
			? (floor === 'solo' ? maxFloorUserCanDo(msg.author) : Number(floor)) ?? maxFloorUserCanDo(msg.author)
			: maxFloorUserCanDo(msg.author);
		const isSolo = floor === 'solo';
		if (isSolo) floorToDo = maxFloorUserCanDo(msg.author);

		if (!isValidFloor(floorToDo)) {
			return msg.channel.send("That's an invalid floor.");
		}

		if (determineDgLevelForFloor(floorToDo) > msg.author.skillLevel(SkillsEnum.Dungeoneering)) {
			return msg.channel.send(`You need level ${determineDgLevelForFloor(floorToDo)} to do Floor ${floorToDo}.`);
		}

		const dungeonLength = Time.Minute * 5 * (floorToDo / 2);
		let quantity = Math.floor(msg.author.maxTripLength('Dungeoneering') / dungeonLength);
		let duration = quantity * dungeonLength;

		let message = `${msg.author.username} has created a Dungeoneering party! Anyone can click the ${
			Emoji.Join
		} reaction to join, click it again to leave.

**Floor:** ${floorToDo}
**Duration:** ${formatDuration(duration)}
**Min. Quantity:** ${quantity}
**Required Stats:** ${formatSkillRequirements(requiredSkills(floorToDo))}`;

		const partyOptions: MakePartyOptions = {
			leader: msg.author,
			minSize: 1,
			maxSize: maxTeamSize,
			ironmanAllowed: true,
			message,
			customDenier: async user => {
				if (!user.hasMinion) {
					return [true, "you don't have a minion."];
				}
				if (user.minionIsBusy) {
					return [true, 'your minion is busy.'];
				}

				const max = maxFloorUserCanDo(user);
				if (max < floorToDo) {
					return [
						true,
						`this party is doing Floor ${floorToDo}, you can't do this floor because you need level ${determineDgLevelForFloor(
							floorToDo
						)} Dungeoneering.`
					];
				}

				if (!hasRequiredLevels(user, floorToDo)) {
					return [
						true,
						`you don't have the required stats for this floor, you need: ${formatSkillRequirements(
							requiredSkills(floorToDo)
						)}.`
					];
				}

				return [false];
			}
		};

		const leaderCheck = await partyOptions.customDenier!(msg.author);
		if (leaderCheck[0]) {
			return msg.channel.send(
				`You can't start a Dungeoneering party for Floor ${floorToDo} because ${leaderCheck[1]}`
			);
		}

		const users = floor === 'solo' ? [msg.author] : await msg.makePartyAwaiter(partyOptions);
		const boosts = [];
		for (const user of users) {
			const check = await partyOptions.customDenier!(user);
			if (check[0]) {
				return msg.channel.send(
					`You can't start a Dungeoneering party because of ${user.username}: ${check[1]}`
				);
			}
			if (await user.hasItem(itemID('Scroll of teleportation'))) {
				let y = 15;
				if (user.hasItemEquippedOrInBank('Dungeoneering master cape')) {
					y += 10;
				} else if (
					user.hasItemEquippedOrInBank('Dungeoneering cape') ||
					user.hasItemEquippedOrInBank('Dungeoneering cape(t)')
				) {
					y += 5;
				}

				let x = y / users.length;

				duration = reduceNumByPercent(duration, x);
				boosts.push(`${x.toFixed(2)}% from ${user.username}`);
			}
			const numGora = numberOfGorajanOutfitsEquipped(user);
			if (numGora > 0) {
				let x = (numGora * 6) / users.length;
				duration = reduceNumByPercent(duration, x);
				boosts.push(`${x.toFixed(2)}% from ${user.username}'s Gorajan`);
			}
		}

		duration = reduceNumByPercent(duration, 20);

		if (users.length > 1) {
			const boostMultiplier = Math.min(users.length, maxBoostSize);
			duration = reduceNumByPercent(duration, boostMultiplier * boostPerPlayer);
			boosts.push(
				`${boostMultiplier * boostPerPlayer}% for having a team of ${
					users.length < maxBoostSize ? users.length : `${maxBoostSize}+`
				}`
			);
		}

		// Calculate new number of floors will be done now that it is about to start
		const perFloor = duration / quantity;
		quantity = Math.floor(msg.author.maxTripLength('Dungeoneering') / perFloor);
		duration = quantity * perFloor;

		let str = `${partyOptions.leader.username}'s dungeoneering party (${users
			.map(u => u.username)
			.join(', ')}) is now off to do ${quantity}x dungeons of the ${formatOrdinal(
			floorToDo
		)} floor. Each dungeon takes ${formatDuration(perFloor)} - the total trip will take ${formatDuration(
			duration
		)}.`;

		if (boosts.length > 0) {
			str += `\n\n**Boosts:** ${boosts.join(', ')}.`;
		}

		await addSubTaskToActivityTask<DungeoneeringOptions>({
			userID: msg.author.id,
			channelID: msg.channel.id,
			quantity,
			duration,
			type: 'Dungeoneering',
			leader: msg.author.id,
			users: users.map(u => u.id),
			floor: floorToDo
		});

		return msg.channel.send(str);
	}
}