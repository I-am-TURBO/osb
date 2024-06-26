import { Bank } from 'oldschooljs';

import { MIN_LENGTH_FOR_PET } from '../../lib/constants';
import { globalDroprates } from '../../lib/data/globalDroprates';
import { KourendKebosDiary, userhasDiaryTier } from '../../lib/diaries';
import calcBurntCookables from '../../lib/skilling/functions/calcBurntCookables';
import Cooking from '../../lib/skilling/skills/cooking/cooking';
import { SkillsEnum } from '../../lib/skilling/types';
import { CookingActivityTaskOptions } from '../../lib/types/minions';
import { clAdjustedDroprate, roll } from '../../lib/util';
import { handleTripFinish } from '../../lib/util/handleTripFinish';

export const cookingTask: MinionTask = {
	type: 'Cooking',
	async run(data: CookingActivityTaskOptions) {
		const { cookableID, quantity, userID, channelID, duration } = data;
		const user = await mUserFetch(userID);

		const cookable = Cooking.Cookables.find(cookable => cookable.id === cookableID)!;

		let burnedAmount = 0;
		let stopBurningLvl = 0;

		const [hasEasyDiary] = await userhasDiaryTier(user, KourendKebosDiary.easy);
		const [hasEliteDiary] = await userhasDiaryTier(user, KourendKebosDiary.elite);
		const hasGaunts = user.hasEquipped('Cooking gauntlets');

		if (hasEasyDiary && cookable.burnKourendBonus) {
			stopBurningLvl = cookable.burnKourendBonus[(hasEliteDiary ? 1 : 0) * 2 + (hasGaunts ? 1 : 0)];
		} else if (cookable.stopBurnAtCG && hasGaunts) {
			stopBurningLvl = cookable.stopBurnAtCG;
		} else {
			stopBurningLvl = cookable.stopBurnAt;
		}

		burnedAmount = calcBurntCookables(quantity, stopBurningLvl, user.skillLevel(SkillsEnum.Cooking));

		const xpReceived = (quantity - burnedAmount) * cookable.xp;

		const xpRes = await user.addXP({
			skillName: SkillsEnum.Cooking,
			amount: xpReceived,
			duration
		});

		let str = `${user}, ${user.minionName} finished cooking ${quantity}x ${cookable.name}. ${xpRes}`;

		if (burnedAmount > 0) {
			str += `\n\n${burnedAmount}x ${cookable.name} failed to cook.`;
		}

		const loot = new Bank({ [cookable.id]: quantity });
		loot.remove(cookable.id, burnedAmount);
		loot.add(cookable.burntCookable, burnedAmount);

		if (duration >= MIN_LENGTH_FOR_PET) {
			const dropRate = clAdjustedDroprate(
				user,
				'Remy',
				globalDroprates.remy.baseRate,
				globalDroprates.remy.clIncrease
			);
			const minutesInTrip = Math.ceil(duration / 1000 / 60);
			for (let i = 0; i < minutesInTrip; i++) {
				if (roll(dropRate)) {
					loot.add('Remy');
					str +=
						"\n<:remy:748491189925183638> A small rat notices you cooking, and tells you you're cooking it all wrong! He crawls into your bank to help you with your cooking. You can equip Remy for a boost to your cooking skills.";
					break;
				}
			}
		}

		str += `\nYou received: ${loot}.`;

		await transactItems({
			userID: user.id,
			collectionLog: true,
			itemsToAdd: loot
		});

		handleTripFinish(user, channelID, str, undefined, data, loot);
	}
};
