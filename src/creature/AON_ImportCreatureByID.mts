[h: buildRequest = macro.args]
[h: aonID = ""]

[h, if(buildRequest != "" && json.type(buildRequest) == "OBJECT" && json.contains(buildRequest, "BuildRequest")): aonID = json.get(buildRequest, "BuildRequest")]

[h, if(aonID == ""), code: {
	[h: status = input("aonID|3046|Enter AoN Creature ID|TEXT|WIDTH=60")]
	[h: abort(status)]
}]

[h: assert(aonID != "", "Enter an AoN creature ID.", 0)]
[h: aonID = lower(aonID)]
[h: hasPrefix = startsWith(aonID, "creature-")]
[h, if(hasPrefix == 0): aonID = "creature-" + aonID]

[h: targetItem = aonID]
[h: urlIndex = 'https://elasticsearch.aonprd.com/json-data/aon73-index.json']
[h: indexJson = REST.get(urlIndex, '{"Accept": ["application/json"], "Accept-Encoding": [""]}', 0)]

[h: assert(indexJson != "", "Failed to load AON index file.", 0)]
[h: assert(json.type(indexJson) == "OBJECT", "AON index response was not a JSON object.", 0)]

[h: indexKeyFound = ""]

[h: keys = json.fields(indexJson)]
[h: keyCount = listCount(keys)]

[h, for(i, 0, keyCount), code: {
	[h, if(indexKeyFound == ""), code: {
		[h: key = listGet(keys, i)]
		[h: arr = json.get(indexJson, key)]
		[h: found = json.contains(arr, targetItem)]
		[h, if(found == 1): indexKeyFound = key]
	}]
}]

[h: assert(indexKeyFound != "", "Item not found in aon73-index.json: " + targetItem, 0)]

[h: urlData = 'https://elasticsearch.aonprd.com/json-data/' + indexKeyFound + '.json']
[h: htmlData = REST.get(urlData, '{"Accept": ["application/json"], "Accept-Encoding": [""]}', 0)]

[h: assert(htmlData != "", "Failed to load AON data file: " + indexKeyFound + ".json", 0)]
[h: assert(json.type(htmlData) == "ARRAY", "AON bucket response was not a JSON array.", 0)]

[h: creatureData = ""]
[h: dataCount = json.length(htmlData)]

[h, for(i, 0, dataCount), code: {
	[h, if(creatureData == ""), code: {
		[h: obj = json.get(htmlData, i)]
		[h: objID = json.get(obj, "id")]
		[h, if(objID == targetItem): creatureData = obj]
	}]
}]

[h: assert(creatureData != "", "Bucket loaded, but creature id was not found: " + targetItem, 0)]

[macro.return = creatureData]
