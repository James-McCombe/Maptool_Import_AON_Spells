[h: creatureData = macro.args]
[h: assert(creatureData != "", "No creature data passed to _ParseCreatureInfo.", 0)]
[h: assert(json.type(creatureData) == "OBJECT", "Creature data is not a JSON object.", 0)]

[h: rawMarkdown = ""]
[h, if(json.contains(creatureData, "markdown")): rawMarkdown = json.get(creatureData, "markdown")]
[h, if(rawMarkdown == "" && json.contains(creatureData, "text")): rawMarkdown = json.get(creatureData, "text")]
[h, if(rawMarkdown == "" && json.contains(creatureData, "description")): rawMarkdown = json.get(creatureData, "description")]

[h: creatureInfoRaw = rawMarkdown]
[h: cutIndex = -1]
[h: markerList = "**Perception**,**Skills**,**Str**,**AC**,**HP**,**Speed**,**Melee**,**Ranged**,**Spells**,**Primal Innate Spells**,**Arcane Innate Spells**,**Divine Innate Spells**,**Occult Innate Spells**,**Items**"]
[h, foreach(marker, markerList), code: {
	[h: markerIndex = indexOf(creatureInfoRaw, marker)]
	[h, if(markerIndex >= 0 && (cutIndex == -1 || markerIndex < cutIndex)): cutIndex = markerIndex]
}]
[h, if(cutIndex > 0): creatureInfoRaw = substring(creatureInfoRaw, 0, cutIndex)]

[h: descriptionText = creatureInfoRaw]
[h: descriptionText = replace(descriptionText, "(?s)\[([^\]]+)\]\([^\)]+\)", "$1")]
[h: descriptionText = replace(descriptionText, "(?m)^#+\\s*", "")]
[h: descriptionText = replace(descriptionText, "\\*\\*", "")]
[h: descriptionText = replace(descriptionText, "__", "")]
[h: descriptionText = replace(descriptionText, "\\r", "")]
[h: descriptionText = trim(descriptionText)]

[h: creatureInfo = json.set("{}", "DescriptionText", descriptionText, "RawMarkdown", creatureInfoRaw, "ParserVersion", "1.00", "ParseSource", "markdown")]

[macro.return = creatureInfo]