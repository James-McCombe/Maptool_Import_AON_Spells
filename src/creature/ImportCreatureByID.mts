[h: buildRequest = ""]
[h, if(isDefined("macro.args")): buildRequest = macro.args]
[h: aonID = ""]

[h: buildRequestText = "" + buildRequest]
[h: buildRequestLooksObject = startsWith(trim(buildRequestText), "{")]
[h, if(buildRequest != "" && buildRequestLooksObject == 1), code: {
	[h: buildRequestType = json.type(buildRequest)]
	[h, if(buildRequestType == "OBJECT" && json.contains(buildRequest, "BuildRequest")), code: {
		[h: buildRequestValue = json.get(buildRequest, "BuildRequest")]
		[h: buildRequestValueText = "" + buildRequestValue]
		[h: buildRequestValueLooksObject = startsWith(trim(buildRequestValueText), "{")]
		[h, if(buildRequestValueLooksObject == 1), code: {
			[h: buildRequestValueType = json.type(buildRequestValue)]
			[h, if(buildRequestValueType == "OBJECT" && json.contains(buildRequestValue, "AONID")): aonID = json.get(buildRequestValue, "AONID")]
			[h, if(aonID == "" && buildRequestValueType == "OBJECT" && json.contains(buildRequestValue, "SourceID")): aonID = json.get(buildRequestValue, "SourceID")]
		};{
			[h: aonID = buildRequestValue]
		}]
	}]
}]
[h, if(aonID == "" && buildRequest != "" && buildRequestLooksObject == 0): aonID = buildRequest]

[h, if(aonID == ""), code: {
	[h: status = input("aonID|3046|Enter AoN Creature ID|TEXT|WIDTH=60")]
	[h: abort(status)]
}]

[h: assert(aonID != "", "Enter an AoN creature ID.", 0)]
[h: aonID = lower(aonID)]
[h: hasPrefix = startsWith(aonID, "creature-")]
[h, if(hasPrefix == 0): aonID = "creature-" + aonID]

[h: creatureID = aonID]
[h: idSeparator = indexOf(creatureID, "-")]
[h: assert(idSeparator >= 0, "Creature ID must include a hyphen: " + creatureID, 0)]
[h: aonCreatureNumber = substring(creatureID, idSeparator + 1)]
[h: aonURL = "https://2e.aonprd.com/Monsters.aspx?ID=" + aonCreatureNumber]
[h: aonType = "Creature"]
[h: aonSource = "AoN"]
[h: importerVersion = "1.00"]
[h: manualReviewNeeded = 1]

[h, macro("_GetAonItemByID@Lib:AON"): creatureID]
[h: creatureData = macro.return]

[h: assert(creatureData != "", "Failed to retrieve creature data: " + creatureID, 0)]
[h: assert(json.type(creatureData) == "OBJECT", "Creature data was not a JSON object: " + creatureID, 0)]

[h, macro("_ParseCreatureAttacks@Lib:AON"): creatureData]
[h: parsedAttacks = macro.return]
[h, macro("_ParseCreatureAbilities@Lib:AON"): creatureData]
[h: parsedAbilities = macro.return]
[h, macro("_ParseCreatureInfo@Lib:AON"): creatureData]
[h: parsedCreatureInfo = macro.return]

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

[h: propertyArgs = json.set("{}", "tokenID", newTokenID, "creatureData", creatureData, "parsedAttacks", parsedAttacks, "parsedAbilities", parsedAbilities, "parsedCreatureInfo", parsedCreatureInfo, "aonURL", aonURL, "aonImageURL", creatureImageURL, "creatureID", creatureID, "aonCreatureNumber", aonCreatureNumber, "aonType", aonType, "aonSource", aonSource, "importerVersion", importerVersion, "manualReviewNeeded", manualReviewNeeded)]
[h, macro("_SetCreatureProperties@Lib:AON"): propertyArgs]

[h: openAonArgs = json.set("{}", "tokenID", newTokenID)]
[h, macro("_AddOpenAonPageMacro@Lib:AON"): openAonArgs]

[h, macro("_AddRebuildAonMacro@Lib:AON"): openAonArgs]

[h, macro("_AddParsedAttackMacros@Lib:AON"): openAonArgs]

[h, macro("_AddParsedSpecialAbilities@Lib:AON"): openAonArgs]

[r: "Success: imported AoN creature " + creatureName + " (" + creatureID + ")."]
[r, if(creatureImageURL != ""): "<br>AoN image URL: " + creatureImageURL]