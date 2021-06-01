import { KlasaUser } from 'klasa';
import { Monsters } from 'oldschooljs';
import Monster from 'oldschooljs/dist/structures/Monster';

import { NIGHTMARES_HP } from '../../constants';
import { SkillsEnum } from '../../skilling/types';
import killableMonsters from '../data/killableMonsters';
import KingGoldemar from '../data/killableMonsters/custom/KingGoldemar';
import { VasaMagus } from '../data/killableMonsters/custom/VasaMagus';
import { KillableMonster } from '../types';

export { default as reducedTimeForGroup } from './reducedTimeForGroup';
export { default as calculateMonsterFood } from './calculateMonsterFood';

export type AttackStyles =
	| SkillsEnum.Attack
	| SkillsEnum.Strength
	| SkillsEnum.Defence
	| SkillsEnum.Magic
	| SkillsEnum.Ranged;

function meleeOnly(user: KlasaUser): AttackStyles[] {
	const skills = user.getAttackStyles();
	if (skills.some(skill => skill === SkillsEnum.Ranged || skill === SkillsEnum.Magic)) {
		return [SkillsEnum.Attack, SkillsEnum.Strength, SkillsEnum.Defence];
	}
	return skills;
}

export function resolveAttackStyles(
	user: KlasaUser,
	monsterID: number
): [KillableMonster | undefined, Monster | undefined, AttackStyles[]] {
	if (monsterID === KingGoldemar.id) return [undefined, undefined, meleeOnly(user)];
	if (monsterID === VasaMagus.id) return [undefined, undefined, [SkillsEnum.Magic]];

	const killableMon = killableMonsters.find(m => m.id === monsterID);

	if (!killableMon) {
		return [undefined, undefined, [SkillsEnum.Attack, SkillsEnum.Strength, SkillsEnum.Defence]];
	}

	const osjsMon = Monsters.get(monsterID);

	// The styles chosen by this user to use.
	let attackStyles = user.getAttackStyles();

	// The default attack styles to use for this monster, defaults to shared (melee)
	const monsterStyles = killableMon?.defaultAttackStyles ?? [
		SkillsEnum.Attack,
		SkillsEnum.Strength,
		SkillsEnum.Defence
	];

	// If their attack style can't be used on this monster, or they have no selected attack styles selected,
	// use the monsters default attack style.
	if (
		attackStyles.length === 0 ||
		attackStyles.some(s => killableMon?.disallowedAttackStyles?.includes(s))
	) {
		attackStyles = monsterStyles;
	}

	return [killableMon, osjsMon, attackStyles];
}

const miscHpMap: Record<number, number> = {
	3127: 250,
	46274: 5000,
	9415: NIGHTMARES_HP,
	[KingGoldemar.id]: 10_000,
	[VasaMagus.id]: 3900
};

export async function addMonsterXP(
	user: KlasaUser,
	monsterID: number,
	quantity: number,
	duration: number
) {
	const [, osjsMon, attackStyles] = resolveAttackStyles(user, monsterID);
	const monster = killableMonsters.find(mon => mon.id === monsterID);
	let hp = miscHpMap[monsterID] || 1;
	let xpMultiplier = 1;
	if (monster && monster.customMonsterHP) {
		hp = monster.customMonsterHP;
	} else if (osjsMon?.data?.hitpoints) {
		hp = osjsMon.data.hitpoints;
	}
	if (monster && monster.combatXpMultiplier) {
		xpMultiplier = monster.combatXpMultiplier;
	}
	const totalXP = hp * 4 * quantity * xpMultiplier;
	const xpPerSkill = totalXP / attackStyles.length;

	let res: string[] = [];

	for (const style of attackStyles) {
		res.push(await user.addXP(style, Math.floor(xpPerSkill), duration));
	}

	res.push(
		await user.addXP(
			SkillsEnum.Hitpoints,
			Math.floor(hp * quantity * 1.33 * xpMultiplier),
			duration
		)
	);

	return res;
}
