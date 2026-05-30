[h: Name = json.get(macro.args, "Name")]
[h: FeatLevel = json.get(macro.args, "FeatLevel")]
[h: Traits = json.get(macro.args, "Traits")]
[h: Trigger = json.get(macro.args, "Trigger")]
[h: Requirements = json.get(macro.args, "Requirements")]
[h: Action = json.get(macro.args, "Action")]
[h: Text = json.get(macro.args, "Text")]

[h, if(StarfinderSkills), code: {
	[h: borderColor = "#9ddae6"]
	[h: bcgColor = "#2d4e6a"]
	[h: outerBorder = "#9ddae6"]
	[h: innerBorder = "#5a3994"]
	[h: innerBcg = "#ffffff"]
	[h: style = "solid"]
}; {
	[h: borderColor = "#d9c484"]
	[h: bcgColor = "#5a0308"]
	[h: outerBorder = "#dbc385"]
	[h: innerBorder = "#002a17"]
	[h: innerBcg = "#FAF9F8"]
	[h: style = "inset"]
}]

[h, if(json.contains(Traits, "Attuned")), code: {
	[h, macro("attunedLogic@Lib:Pf2"): ""]
}]
[h, if(json.contains(Traits, "Cycle")), code: {
	[h, macro("cycleLogic@Lib:Pf2"): ""]
}]

[h, if(json.contains(Traits, "Metamagic") && json.contains(Feats, "Metamagic Mastery")), code: {
	[h: Action = "F"]
}]
[h: Traits = if(json.contains(Traits, "Sanctified") && Sanctified != "None", json.append(Traits, Sanctified), Traits)]
[h, if(json.contains(Traits, "Positive")), code: {
	[h: Traits = json.remove(Traits, json.indexOf(Traits, "Positive"))]
	[h: Traits = json.append(Traits, "Vitality")]
}]
[h, if(json.contains(Traits, "Negative")), code: {
	[h: Traits = json.remove(Traits, json.indexOf(Traits, "Negative"))]
	[h: Traits = json.append(Traits, "Void")]
}]
[h, if(json.contains(Traits, "Good")), code: {
	[h: Traits = json.remove(Traits, json.indexOf(Traits, "Good"))]
	[h: Traits = json.append(Traits, "Holy")]
}]
[h, if(json.contains(Traits, "Evil")), code: {
	[h: Traits = json.remove(Traits, json.indexOf(Traits, "Evil"))]
	[h: Traits = json.append(Traits, "Unholy")]
}]

[h: SpecialTrait = if(json.contains(Traits, "Uncommon"), "Uncommon", "")]
[h: SpecialTrait = if(json.contains(Traits, "Rare"), "Rare", SpecialTrait)]
[h: TraitsToSort = Traits]
[h, if(SpecialTrait != ""), code: {
	[h: TraitsToSort = json.remove(TraitsToSort, json.indexOf(TraitsToSort, SpecialTrait))]
}]
[h: TraitsToSort = json.unique(TraitsToSort)]
[h: TraitsToSort = json.sort(TraitsToSort)]
[h: Traits = json.removeAll(Traits, TraitsToSort)]
[h, foreach(trait, TraitsToSort), code: {
	[h: Traits = json.append(Traits, trait)]
}]

[h: xTraits = json.toList(Traits)]
[h: UncommonTrait = if(json.contains(Traits, "Uncommon"), 1, 0)]
[h: UncommonTrait = if(json.contains(Traits, "Rare"), 1, UncommonTrait)]
[h: UncommonColor = "AE531F"]
[h: UncommonColor = if(json.contains(Traits, "Rare"), "002664", UncommonColor)]

[h: NumberOfTraits = listCount(xTraits)]
[h: TraitHtml = if(NumberOfTraits == 0, "", '<table border="0", bgcolor="' + bcgColor + '", style="font-size:13pt;font-family:Century Gothic;font-weight:bold;border-spacing:0px;"><tr>')]
[h, for(i, 0, NumberOfTraits), code: {
	[h: TraitName = listGet(xTraits, i)]
	[h: TraitCell = if(UncommonTrait == 1 && i == 0, " <td style='border:3px solid " + borderColor + ";background-color:#" + UncommonColor + ";'><font color='white'>&nbsp; " + TraitName + " &nbsp;</font> </td>", " <td style='border:3px solid " + borderColor + ";'><font color='white'>&nbsp; " + TraitName + " &nbsp;</font> </td>")]
	[h: TraitHtml = TraitHtml + TraitCell]
}]
[h: TraitHtml = if(NumberOfTraits == 0, TraitHtml, TraitHtml + "</tr></table>")]

[h: Text = replace(Text, "<hr/>", "<hr><font color='black'>")]
[h: Text = replace(Text, "<hr />", "<hr><font color='black'>")]
[h: Text = replace(Text, "<hr>", "<hr><font color='black'>")]
[h: Text = replace(Text, "</h3>", "</h3><font color='black'>")]
[h: Text = replace(Text, "</h2>", "</h2><font color='black'>")]
[h: Text = replace(Text, "<h3>", "<h3><font color='black'>")]
[h: Text = replace(Text, "<h2>", "<h2><font color='black'>")]
[h: Text = replace(Text, "<font color='black'><font color='black'>", "<font color='black'>")]

[h: actionHtml = ""]
[h, if(Action == "1"), code: {
	[h: actionHtml = '<img height=15 width=15 src="asset://e7876556a71025c1a63de5aa47553c43" />']
	[h: assert(if(initiativeSize() > 0 && state.4Action == 0 && state.3Action == 0 && state.2Action == 0 && state.1Action == 0, 0, 1), "You have used all your actions!", 0)]
}]
[h, if(Action == "2"), code: {
	[h: actionHtml = '<img height=13 width=20 src="asset://6d8ac5fce8e04fc97996d921acea5499" />']
	[h: assert(if(initiativeSize() > 0 && state.4Action == 0 && state.3Action == 0 && state.2Action == 0, 0, 1), "You do not have enough time for this action!", 0)]
}]
[h, if(Action == "3"), code: {
	[h: actionHtml = '<img height=15 width=31 src="asset://ba42444f6e7189a4450a18edb9aea022" />']
	[h: assert(if(initiativeSize() > 0 && state.4Action == 0 && state.3Action == 0, 0, 1), "You do not have time for this action!", 0)]
}]
[h, if(Action == "R"), code: {
	[h: actionHtml = '<img height=18 width=18 src="asset://350ae7b3054be8a96f62ddf0f13de5ba" />']
	[h, macro("Reaction@Lib:Actions"): ""]
}]
[h, if(Action == "F"): actionHtml = '<img height=15 width=15 src="asset://70ad3250dee31e0250014fb92ed1e159" />']
[h, if(Action != "" && Action != "1" && Action != "2" && Action != "3" && Action != "R" && Action != "F"): actionHtml = Action]

[h: outputHtml = '<div style="background-color: ' + outerBorder + '; width: 270px; border: 1px solid ' + outerBorder + '; border-style: ' + style + '; padding: 0px; margin: 0px;">']
[h: outputHtml = outputHtml + '<div style="background-color: ' + innerBcg + '; width: 100%; border: 5px solid ' + innerBorder + '; padding: 5px; margin: 1px;">']
[h: outputHtml = outputHtml + '<table style="width:100%;font-size:16pt;font-family:Arial;margin:0px;padding:0px;"><tr>']
[h: outputHtml = outputHtml + '<td><strong><font color="black">' + Name + ' </strong>' + actionHtml + '</td>']
[h: outputHtml = outputHtml + '<td style="text-align:right"><b><font color="black">Feat ' + FeatLevel + '</b></td>']
[h: outputHtml = outputHtml + '</tr></table>']
[h: outputHtml = outputHtml + '<div style="border-top:2px solid black;padding: 3px 0px 0px 0px;width: 270px;">' + TraitHtml + '</div>']

[h, if(Trigger != "" || Requirements != ""), code: {
	[h: outputHtml = outputHtml + '<div style="font-family:Arial;width: 270px;padding: 3px 0px 0px 0px;"><font color="black">']
	[h, if(Trigger != ""), code: {
		[h: outputHtml = outputHtml + "<b>Trigger</b> " + Trigger]
		[h: outputHtml = outputHtml + if(Requirements == "", '</div><div style="border-top:1px solid black;"><font color="black">', "<br>")]
	}]
	[h, if(Requirements != ""), code: {
		[h: outputHtml = outputHtml + "<b>Requirements</b> " + Requirements + '</div><div style="border-top:1px solid black;"><font color="black">']
	}]
}]

[h: outputHtml = outputHtml + '<font color="black">' + Text]
[h: outputHtml = outputHtml + '</div></div></div></div>']

[h: Feats = if(json.contains(Feats, Name), Feats, json.append(Feats, Name))]

[h, if(Action == "1"), code: {
	[h, macro("Single Action@Lib:Actions"): ""]
}]
[h, if(Action == "2"), code: {
	[h, macro("Two-Action Activity@Lib:Actions"): ""]
}]
[h, if(Action == "3"), code: {
	[h, macro("Three-Action Activity@Lib:Actions"): ""]
}]

[macro.return = outputHtml]
