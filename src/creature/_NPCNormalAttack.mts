[h: AttackName = json.get(macro.args, "AttackName")]
[h: AttackType = json.get(macro.args, "AttackType")]
[h: Traits = json.get(macro.args, "Traits")]
[h: AttackModifier = json.get(macro.args, "AttackModifier")]
[h: Damage = json.get(macro.args, "Damage")]
[h: initialDamage = Damage]
[h: DamageType = json.get(macro.args, "DamageType")]
[h: Damage2 = json.get(macro.args, "Damage2")]
[h: Damage2Type = json.get(macro.args, "Damage2Type")]
[h: Effect = json.get(macro.args, "Effect")]
[h: Action = json.get(macro.args, "Action")]
[h: ApplyAttackKeyword = json.get(macro.args, "ApplyAttackKeyword")]

[h, if(isNumber(AttackModifier)), code: {
	[h: AttackModifier = AttackModifier - if(ProficiencyWithoutLevel && Level > 0, Level, 0)]
}]

[h: Damage = if(Damage == "", Damage, Damage + "+" + TempDamageBonus)]
[h: NameLabel = capitalize(AttackName)]
[h: NameLabel = replace(NameLabel, " Of ", " of ")]
[h: NameLabel = replace(NameLabel, " To ", " to ")]
[h: NameLabel = replace(NameLabel, " The ", " the ")]
[h: NameLabel = replace(NameLabel, " With ", " with ")]
[h: NameLabel = replace(NameLabel, " And ", " and ")]
[h: NameLabel = replace(NameLabel, "&#39S", "&#39s")]
[h: NameLabel = replace(NameLabel, "&#39;S", "&#39s")]

[h: Effect = replace(Effect, "<hr/>", "<hr><font color='black'>")]
[h: Effect = replace(Effect, "<hr />", "<hr><font color='black'>")]
[h: Effect = replace(Effect, "<hr>", "<hr><font color='black'>")]
[h: Effect = replace(Effect, "</h3>", "</h3><font color='black'>")]
[h: Effect = replace(Effect, "</h2>", "</h2><font color='black'>")]
[h: Effect = replace(Effect, "<h3>", "<h3><font color='black'>")]
[h: Effect = replace(Effect, "<h2>", "<h2><font color='black'>")]
[h: Effect = replace(Effect, "<font color='black'><font color='black'>", "<font color='black'>")]

[h: isDeadly = 0]
[h: isFatal = 0]
[h: isKeen = 0]
[h: DeadlyDie = ""]

[h, foreach(trait, Traits), code: {
	[h: TraitDeadly = if(startsWith(trait, "deadly"), 1, 0)]
	[h, if(TraitDeadly == 1), code: {
		[h: isDeadly = 1]
		[h: DeadlyDie = substring(trait, 7)]
	}]

	[h: TraitFatal = if(startsWith(trait, "fatal"), 1, 0)]
	[h, if(TraitFatal == 1), code: {
		[h: isFatal = 1]
		[h: DeadlyDie = substring(trait, 6)]
	}]

	[h: isKeen = if(trait == "keen", 1, isKeen)]
}]

[h: whichDie = "d20"]
[h, if(getPropertyType() == "DCC_NPC" && AttackType != "--"), code: {
	[h: DiceChain = "d3, d4, d5, d6, d7, d8, d10, d12, d14, d16, d20, d24, d30"]
	[h: status = input(
		"junk|<html><h3>" + AttackName + "<br></h3></html>|-|LABEL|SPAN=TRUE",
		"whichDie|" + DiceChain + "|Action Die|LIST|VALUE=STRING SELECT=" + ActionDie1Position,
		"aBonus||Situational Bonus|TEXT|WIDTH=2"
	)]
	[h: abort(status)]
}]

[h: Atk = eval(whichDie)]
[h: CheatingOn = getLibProperty("FudgeRolls", "Lib:Pf2")]
[h, if(CheatingOn && isGM()), code: {
	[h: status = input("Atk|" + Atk + "|Fudge Attack Roll|TEXT|WIDTH=6")]
	[h: abort(status)]
}]

[h: x = if(Atk == 20 || (Atk == 19 && isKeen), "Critical Hit!", "")]
[h: x = if(Atk == 1, "Critical Miss!", x)]
[h: DmgTooltip = if(Atk == 20 && isFatal == 0 && getPropertyType() != "DCC_NPC", "(" + Damage + ")*2", Damage)]
[h: DmgTooltip = if(Atk == 20 && isDeadly == 1, DmgTooltip + "+" + DeadlyDie, DmgTooltip)]
[h: DmgTooltip = if(state.Rage, DmgTooltip + "+2", DmgTooltip)]

[h, if(Atk == 20 && Damage2 != "" && getPropertyType() != "DCC_NPC"), code: {
	[h: Damage2 = "(" + Damage2 + ")*2"]
}]
[h, if(Atk == 1 && Damage2 != ""), code: {
	[h: Damage2 = "0d1"]
}]

[h, if(initiativeSize() > 0), code: {
	[h: setLibProperty("LastNPCAttack", getInitiativeToken(), "Lib:Pf2")]
}]

[h: TraitList = json.toList(Traits, ", ")]
[h: LineOne = if(AttackType != "--", "<b>" + AttackType + " </b>", "<b>" + NameLabel + " </b>")]
[h, if(Action == "1"): LineOne = LineOne + "<img height=15 width=15 src='asset://e7876556a71025c1a63de5aa47553c43' /> "]
[h, if(Action == "2"): LineOne = LineOne + "<img height=13 width=20 src='asset://6d8ac5fce8e04fc97996d921acea5499' /> "]
[h, if(Action == "3"): LineOne = LineOne + "<img height=15 width=31 src='asset://ba42444f6e7189a4450a18edb9aea022' /> "]
[h, if(Action == "R"), code: {
	[h: LineOne = LineOne + "<img height=18 width=18 src='asset://350ae7b3054be8a96f62ddf0f13de5ba' /> "]
	[h, macro("Reaction@Lib:Actions"): 0]
}]
[h, if(Action == "F"): LineOne = LineOne + "<img height=15 width=15 src='asset://70ad3250dee31e0250014fb92ed1e159' /> "]
[h, if(Action != "" && Action != "1" && Action != "2" && Action != "3" && Action != "R" && Action != "F"): LineOne = LineOne + " " + Action + " "]
[h: LineOne = if(AttackModifier != "", LineOne + "&nbsp;" + AttackName, LineOne)]
[h: LineOne = if(TraitList == "", LineOne, LineOne + "&nbsp;(" + TraitList + ")")]

[h: outputHtml = '<div style="background-color: #dbc385; border: 1px solid #dbc385; border-style: inset; padding: 0px; margin: 0px;">']
[h: outputHtml = outputHtml + '<div style="background-color: #FAF9F8; border: 5px solid #002a17; padding: 5px; margin: 1px;"><font color="black">']

[h: lineWidthStyle = if(length(LineOne) > 140 || length(TraitList + AttackType + NameLabel) > 50, ' style="width:230px;"', "")]
[h: outputHtml = outputHtml + "<div" + lineWidthStyle + "><font color='black'>" + LineOne + "</div>"]

[h: aPenalty = Frightened + Sickened]
[h: aPenalty = if(AttackType == "Ranged", aPenalty + Clumsy, aPenalty)]

[h, if(AttackModifier != ""), code: {
	[h: maPenalty = if(json.contains(Traits, "agile"), 4, 5) * AttacksThisRound]
	[h: CircBonus = if(state.Prone, max(TempAttackBonus - 2, -2), TempAttackBonus)]
	[h: AttackTooltip = whichDie + "(" + Atk + ") + " + AttackModifier + if(CircBonus == 0, "", " + " + CircBonus) + if(maPenalty == 0, "", " - " + maPenalty) + if(aPenalty == 0, "", " - " + aPenalty)]
	[h: AttackRoll = Atk + AttackModifier + CircBonus - if(json.contains(Traits, "agile"), 4, 5) * AttacksThisRound - aPenalty]
	[h: AttackOutput = "<span title='<html>" + AttackTooltip + "</html>'style='background-color:#E7E7E7;'>" + AttackRoll + "</span>"]
	[h: outputHtml = outputHtml + "<font color='black'><b>Attack: " + AttackOutput + " " + x + "</b><br>"]
}]

[h, if(Damage == "" && Effect != ""), code: {
	[h: effectWidthStyle = if(length(Effect) > 50, ' style="width:250px;"', "")]
	[h: outputHtml = outputHtml + "<div" + effectWidthStyle + "><font color='black'>" + Effect + "</div>"]
}]

[h, if(Damage != ""), code: {
	[h: DamageValue = max(1, eval(DmgTooltip))]
	[h: DamageOutput = "<b><span title='<html>" + DmgTooltip + "</html>'style='background-color:#E7E7E7;'>" + DamageValue + "</span>"]
	[h: outputHtml = outputHtml + '<font color="black"><b>Damage: ' + DamageOutput + " " + DamageType + "</b>"]
	[h, if(Damage2 != ""), code: {
		[h: outputHtml = outputHtml + " and " + eval(Damage2) + " " + Damage2Type]
	}]
	[h, if(Effect != ""), code: {
		[h: outputHtml = outputHtml + " and " + Effect]
	}]
}]

[h, if(isFatal), code: {
	[h: DamageDice = if(startsWith(initialDamage, "d"), 1, substring(initialDamage, 0, 1))]
	[h: DamageString = if(startsWith(initialDamage, "d"), 1 + initialDamage, initialDamage)]
	[h: ContainsBonus = matches(DamageString, ".*(\\+)(\\d+)")]
	[h: ContainsPenalty = matches(DamageString, ".*(\\-)(\\d+)")]
	[h: CriticalDamageTooltip = if(TempDamageBonus == 0, "(" + DamageDice + DeadlyDie + ")*2+" + DeadlyDie, "(" + DamageDice + DeadlyDie + "+" + TempDamageBonus + ")*2+" + DeadlyDie)]

	[h, if(ContainsBonus), code: {
		[h: id = strfind(DamageString, "(\\d+)(d)(\\d+)(\\+)(\\S+)")]
		[h: BonusValue = getGroup(id, 1, 5) + TempDamageBonus]
		[h: CriticalDamageTooltip = "(" + DamageDice + DeadlyDie + "+" + BonusValue + ")*2+" + DeadlyDie]
	}]
	[h, if(ContainsPenalty), code: {
		[h: id = strfind(DamageString, "(\\d+)(d)(\\d+)(\\-)(\\S+)")]
		[h: BonusValue = getGroup(id, 1, 5) + TempDamageBonus]
		[h: CriticalDamageTooltip = "(" + DamageDice + DeadlyDie + "-" + BonusValue + ")*2+" + DeadlyDie]
	}]

	[h: CriticalDamage = max(DamageValue * 2, eval(CriticalDamageTooltip))]
	[h: CritDamage = "<b><span title='<html>" + CriticalDamageTooltip + "</html>'style='background-color:#E7E7E7;'>" + CriticalDamage + "</span>"]
	[h: outputHtml = outputHtml + "<br><b>Critical Damage</b>: " + CritDamage + " " + DamageType + " damage</b>"]
}]

[h, if(getPropertyType() == "DCC_NPC" && AttackModifier != ""), code: {
	[h, if(Atk >= 20), code: {
		[h: CritRoll = eval(CritDie + "+" + Lck)]
		[h, macro("Crit Table " + CritTable + "@lib:DCC"): CritRoll]
		[h: outputHtml = outputHtml + "<br><b>Critical Effect</b>: " + macro.return]
	}]
	[h, if(Atk == 1), code: {
		[h: FumbleRoll = eval(FumbleDie + "-" + Lck)]
		[h: FumbleData = json.set("", "FumbleRoll", FumbleRoll)]
		[h, macro("Fumbles@lib:DCC"): FumbleData]
		[h: outputHtml = outputHtml + "<br><b>Fumble Effect</b>: " + macro.return]
	}]
}]

[h, if(ApplyAttackKeyword == 1), code: {
	[h, macro("Attack_Keyword@Lib:Pf2"): ""]
}]
[h, if(ApplyAttackKeyword == 2), code: {
	[h, macro("Attack_Keyword@Lib:Pf2"): ""]
	[h, macro("Attack_Keyword@Lib:Pf2"): ""]
}]

[h: outputHtml = outputHtml + "</div></div></div>"]

[h, if(Action == "1"), code: {
	[h, macro("Single Action@Lib:Actions"): 0]
}]
[h, if(Action == "2"), code: {
	[h, macro("Two-Action Activity@Lib:Actions"): 0]
}]
[h, if(Action == "3"), code: {
	[h, macro("Three-Action Activity@Lib:Actions"): 0]
}]

[macro.return = outputHtml + '<font color="black">']
