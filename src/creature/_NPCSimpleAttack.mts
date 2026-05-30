[h, if(json.isEmpty(macro.args)), code: {
}; {
	[h, foreach(field, json.fields(macro.args), ""), code: {
		[h: set(field, json.get(macro.args, field))]
	}]
}]

[h: AttackName = if(AttackName == "Attack of Opportunity", "Reactive Strike", AttackName)]
[h: outputHtml = ""]

[switch(AttackName), code:
	case "Grab": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]

		[h: AttackName = 'Grab']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<div style="width:350px;"><font color="black"><b>Requirements:</b> The monster&#39;s last action was a success with a Strike that lists Grab in its damage entry, or it has a creature <u>grabbed</u> or <u>restrained</u>.<br> <b>Effect:</b> If used after a Strike, the monster attempts to Grapple the creature using the body part it attacked with. This attempt neither applies nor counts toward the creature&#39;s multiple attack penalty.<br>The monster can instead use Grab and choose one creature it&#39;s grabbing or restraining with an appendage that has Grab to automatically extend that condition to the end of the monster&#39;s next turn.</div>']
		[h: Action = '1']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Grapple']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<div style="border-top:2px solid black;padding: 3px 0px 0px 0px;width:350px"><font color="black"><h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Fortitude DC
			</h3></div><div style="border-top:1px solid black;"><font color="black">
			<b>Critical Success</b> Your opponent is <u>restrained</u> until the end of your next turn unless you move or your opponent Escapes.
			<br><b>Success</b> Your opponent is <u>grabbed</u> until the end of your next turn unless you move or your opponent Escapes.
			<br><b>Failure</b> You fail to grab your opponent. If you already had the opponent <u>grabbed</u> or <u>restrained</u> using a Grapple, those conditions on that creature end.
			<br><b>Critical Failure</b> If you already had the opponent <u>grabbed</u> or <u>restrained</u>, it breaks free. Your target can either grab you, as if it succeeded at using the Grapple action against you, or force you to fall and land <u>prone</u>.</div>']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	case "Improved Grab": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]

		[h: AttackName = 'Improved Grab']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black"><b>Requirements:</b> The monster&#39;s last action was a success with a Strike that lists Grab in its damage entry, or it has a creature <u>grabbed</u> or <u>restrained</u>.<br> <b>Effect:</b> If used after a Strike, the monster attempts to Grapple the creature using the body part it attacked with. This attempt neither applies nor counts toward the creature&#39;s multiple attack penalty.<br>The monster can instead use Grab and choose one creature it&#39;s grabbing or restraining with an appendage that has Grab to automatically extend that condition to the end of the monster&#39;s next turn.']
		[h: Action = 'F']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Grapple']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<div style="border-top:2px solid black;padding: 3px 0px 0px 0px;width:350px"><font color="black"><h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Fortitude DC
			</h3></div><div style="border-top:1px solid black;"><font color="black">
			<b>Critical Success</b> Your opponent is <u>restrained</u> until the end of your next turn unless you move or your opponent Escapes.
			<br><b>Success</b> Your opponent is <u>grabbed</u> until the end of your next turn unless you move or your opponent Escapes.
			<br><b>Failure</b> You fail to grab your opponent. If you already had the opponent <u>grabbed</u> or <u>restrained</u> using a Grapple, those conditions on that creature end.
			<br><b>Critical Failure</b> If you already had the opponent <u>grabbed</u> or <u>restrained</u>, it breaks free. Your target can either grab you, as if it succeeded at using the Grapple action against you, or force you to fall and land <u>prone</u>.</div>']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	case "Knockdown": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]
		[h: DamageTooltip = "d6"]
		[h: DamageRoll = d6]

		[h: AttackName = 'Knockdown']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black"><b>Requirements</b> The monster&#39s last action was a successful Strike that lists Knockdown in its damage entry<br><b>Effect</b> The monster attempts to Trip the creature. This attempt neither applies nor counts toward the monster&#39s multiple attack penalty.']
		[h: Action = '1']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Trip']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<div style="border-top:2px solid black;padding: 3px 0px 0px 0px;"><font color="black">You try to knock a creature to the ground. Attempt an Athletics check against the target&#39;s Reflex DC.
			<h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Reflex DC</h3>
			</div><div style="border-top:1px solid black;"><font color="black">
			<b>Critical Success</b> The target falls, lands <u>prone</u>, and takes <b><span title="<html>'+DamageTooltip+'</html>"style="background-color:#cccccc;">'+DamageRoll+'</span> bludgeoning damage</b>.<br>
			<b>Success</b> The target falls and lands <u>prone</u>.<br>
			<b>Critical Failure</b> You lose your balance, fall, and land <u>prone</u>,.']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	case "Improved Knockdown": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]
		[h: DamageTooltip = "d6"]
		[h: DamageRoll = d6]

		[h: AttackName = 'Improved Knockdown']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black"><b>Requirements</b> The monster&#39s last action was a successful Strike that lists Knockdown in its damage entry<br><b>Effect</b> The monster attempts to Trip the creature. This attempt neither applies nor counts toward the monster&#39s multiple attack penalty.']
		[h: Action = 'F']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Trip']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<div style="border-top:2px solid black;padding: 3px 0px 0px 0px;"><font color="black">You try to knock a creature to the ground. Attempt an Athletics check against the target&#39;s Reflex DC.
			<h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Reflex DC</h3>
			</div><div style="border-top:1px solid black;"><font color="black">
			<b>Critical Success</b> The target falls, lands <u>prone</u>, and takes <b><span title="<html>'+DamageTooltip+'</html>"style="background-color:#cccccc;">'+DamageRoll+'</span> bludgeoning damage</b>.<br>
			<b>Success</b> The target falls and lands <u>prone</u>.<br>
			<b>Critical Failure</b> You lose your balance, fall, and land <u>prone</u>,.']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	case "Push": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]

		[h: AttackName = 'Push']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black"><b>Requirements</b> The monster&#39s last action was a success with a Strike that lists Push in its damage entry.<br><b>Effect</b> The monster attempts to Shove the creature. This attempt neither applies nor counts toward the monster&#39;s multiple attack penalty. If Push lists a distance, change the distance the creature is pushed on a success to that distance.']
		[h: Action = '1']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Shove<hr>']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black">You push an opponent away from you. Attempt an Athletics check against your opponent&#39s Fortitude DC.<h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Fortitude DC		
			</h3><hr><font color="black"><b>Critical Success</b>  You push your opponent up to 10 feet away
			from you. You can Stride after it, but you must move the
			same distance and in the same direction.<br>&nbsp;&nbsp;
			<b>Success</b>  You push your opponent back 5 feet. You can Stride
			after it, but you must move the same distance and in the
			same direction.<br>&nbsp;&nbsp;
			<b>Critical Failure</b> You lose your balance, fall, and land <b>prone</u>.']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	case "Improved Push": {
		[h: SkillBonus = json.get(Skills, "Athletics") - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
		[h: SkillTooltip = "d20+" + SkillBonus]
		[h: roll = d20]
		[h: color = if(roll == 20, "#AA2222", "#000000")]
		[h: color = if(roll == 1, "#2222AA", color)]
		[h: fontsize = if(roll == 20 || roll == 1, "font-size:2em;", "font-size:1.5em;")]
		[h: SkillRoll = roll + SkillBonus]

		[h: AttackName = 'Improved Push']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black"><b>Requirements</b> The monster&#39s last action was a success with a Strike that lists Push in its damage entry.<br><b>Effect</b> The monster attempts to Shove the creature. This attempt neither applies nor counts toward the monster&#39;s multiple attack penalty. If Push lists a distance, change the distance the creature is pushed on a success to that distance.']
		[h: Action = 'F']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]

		[h: AttackName = 'Shove<hr>']
		[h: AttackType = '--']
		[h: Traits = '[]']
		[h: AttackModifier = '']
		[h: Damage = '']
		[h: DamageType = '']
		[h: Damage2 = '']
		[h: Damage2Type = '']
		[h: Effect = '<font color="black">You push an opponent away from you. Attempt an Athletics check against your opponent&#39s Fortitude DC.<h3><font color="black">
			Athletics <span title="<html>'+SkillTooltip+'</html>"style="color:'+color+'; '+fontsize+' background-color:#cccccc;">'+SkillRoll+'</span></span></b></span> vs. Fortitude DC		
			</h3><hr><font color="black"><b>Critical Success</b>  You push your opponent up to 10 feet away
			from you. You can Stride after it, but you must move the
			same distance and in the same direction.<br>&nbsp;&nbsp;
			<b>Success</b>  You push your opponent back 5 feet. You can Stride
			after it, but you must move the same distance and in the
			same direction.<br>&nbsp;&nbsp;
			<b>Critical Failure</b> You lose your balance, fall, and land <b>prone</u>.']
		[h: Action = '']
		[h: ApplyAttackKeyword = 0]
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	};

	default: {
		[h: AttackData = json.set('{}', 'AttackName', AttackName, 'AttackType', AttackType, 'Traits', Traits, 'AttackModifier', AttackModifier, 'Damage', Damage, 'DamageType', DamageType, 'Damage2', Damage2, 'Damage2Type', Damage2Type, 'Effect', Effect, 'Action', Action, 'ApplyAttackKeyword', ApplyAttackKeyword)]
		[h, macro('_NPCNormalAttack@Lib:AON'): AttackData]
		[h: outputHtml = outputHtml + macro.return]
	}
]

[macro.return = outputHtml]
