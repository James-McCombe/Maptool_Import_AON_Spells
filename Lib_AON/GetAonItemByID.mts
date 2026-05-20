[h: targetItem = macro.args]
[h: assert(targetItem != "", "No item id passed to macro.", 0)]

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

[h: itemData = ""]
[h: dataCount = json.length(htmlData)]

[h, for(i, 0, dataCount), code: {
	[h, if(itemData == ""), code: {
		[h: obj = json.get(htmlData, i)]
		[h: objID = json.get(obj, "id")]
		[h, if(objID == targetItem): itemData = obj]
	}]
}]

[h: assert(itemData != "", "Bucket loaded, but item id was not found: " + targetItem, 0)]

[macro.return = itemData]