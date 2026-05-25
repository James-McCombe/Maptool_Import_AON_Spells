[h: creatureID = "creature-3046"]
[h: idSeparator = indexOf(creatureID, "-")]
[h: assert(idSeparator >= 0, "Creature ID must include a hyphen: " + creatureID, 0)]
[h: aonCreatureNumber = substring(creatureID, idSeparator + 1)]
[h: aonURL = "https://2e.aonprd.com/Monsters.aspx?ID=" + aonCreatureNumber]
[h, macro("_GetAonItemByID@Lib:AON"): creatureID]
[h: creatureData = macro.return]

[h: assert(creatureData != "", "Failed to retrieve creature data: " + creatureID, 0)]
[h: assert(json.type(creatureData) == "OBJECT", "Creature data was not a JSON object: " + creatureID, 0)]

[h: creatureName = creatureID]
[h, if(json.contains(creatureData, "name")): creatureName = json.get(creatureData, "name")]

[h: baseTokenID = findToken("baseNPCToken")]
[h: assert(baseTokenID != "", "Could not find baseNPCToken.", 0)]
[h, token(baseTokenID): baseTokenImage = getTokenImage()]
[h: assert(baseTokenImage != "", "baseNPCToken does not have a token image.", 0)]
[h: creatureImage = baseTokenImage]
[h: creatureImageURL = ""]

[h, if(json.contains(creatureData, "image")), code: {
	[h: creatureImages = json.get(creatureData, "image")]
	[h, if(json.type(creatureImages) == "ARRAY" && json.length(creatureImages) > 0), code: {
		[h: creatureImagePath = json.get(creatureImages, 0)]
		[h: creatureImageURL = "https://2e.aonprd.com" + creatureImagePath]
	}]
}]
[h: assert(creatureImage != "", "Could not prepare a token image for " + creatureID + ".", 0)]

[h: libTokenID = findToken("Lib:AON")]
[h: assert(libTokenID != "", "Could not find Lib:AON token.", 0)]
[h, token(libTokenID): libX = getTokenX(0)]
[h, token(libTokenID): libY = getTokenY(0)]

[h: libCellWidth = 2]

[h: targetOffset = libCellWidth]
[h: foundEmptySpot = 0]
[h, while(foundEmptySpot == 0 && targetOffset < libCellWidth + 20), code: {
	[h: areaOffsets = json.append("[]", json.set("{}", "x", targetOffset, "y", 0))]
	[h: area = json.set("{}", "token", libTokenID, "offsets", areaOffsets)]
	[h: tokenLayers = json.append("[]", "TOKEN", "HIDDEN", "OBJECT", "BACKGROUND")]
	[h: conditions = json.set("{}", "layer", tokenLayers, "area", area)]
	[h: spotTokens = getTokens("json", conditions)]
	[h, if(json.length(spotTokens) == 0): foundEmptySpot = 1]
	[h, if(foundEmptySpot == 0): targetOffset = targetOffset + 1]
}]
[h: assert(foundEmptySpot == 1, "Could not find an empty spot to the right of Lib:AON.", 0)]

[h: newX = libX + targetOffset]
[h: newY = libY]
[h: tokenData = json.set("{}", "name", "Creature", "gmName", creatureName, "tokenImage", creatureImage)]
[h: tokenData = json.set(tokenData, "x", newX, "y", newY)]
[h: newTokenID = createToken(tokenData)]
[h: assert(newTokenID != "", "Failed to create creature token.", 0)]
[h: propertyArgs = json.set("{}", "tokenID", newTokenID, "creatureData", creatureData, "aonURL", aonURL, "aonImageURL", creatureImageURL)]
[h, macro("_SetCreatureProperties@Lib:AON"): propertyArgs]

[r: "Success: retrieved AoN creature JSON and created token for " + creatureName + " (" + creatureID + ")."]
[r, if(creatureImageURL != ""): "<br>AoN image URL: " + creatureImageURL]
