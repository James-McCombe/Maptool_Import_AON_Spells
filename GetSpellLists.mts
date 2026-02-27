[h: "This macro updates Lib:AON with cached spell lists from the AON JSON dataset"]

[h: indexUrl = "https://elasticsearch.aonprd.com/json-data/aon73-index.json"]
[h: indexJson = REST.get(indexUrl, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
[h: assert(indexJson != "", "Failed to load AON index file.", 0)]
[h: assert(json.type(indexJson) == "OBJECT", "AON index response was not a JSON object.", 0)]

[h: bucketKeys = json.append('', ''))]
[h: indexKeys = json.fields(indexJson)]
[h: indexKeyCount = listCount(indexKeys)]

[h, for(i, 0, indexKeyCount), code: {
  [h: found = 0]
  [h: bucketKey = listGet(indexKeys, i)]
  [h: bucketArr = json.get(indexJson, bucketKey)]
  [r: isFound = indexOf(string(bucketArr), 'spell-')]
  [h, if(isfound != -1), code: {
  	[h: bucketKeys = json.append(bucketKeys, bucketKey)]
  }]
}]

[h: spellKeyObjs = json.append("", "")]

[h, if(json.length(bucketKeys) > 1): bucketKeys = json.remove(bucketKeys, 0)]

[h, for(j, 0, json.length(bucketKeys)), code: {
  [h: indexKeyFound = json.get(bucketKeys, j)]
  [h: urlData = 'https://elasticsearch.aonprd.com/json-data/' + indexKeyFound + '.json']
  [h: htmlData = REST.get(urlData, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
  [h: spellKeyCount = json.length(htmlData)]
  [h, for(k, 0, spellKeyCount), code: {
 	[h: spellKey = json.get(htmlData, k)]
	[h: spell_name = json.get(spellKey, "name")]
	[h: spell_tradition = json.get(spellKey, "tradition")]
	[h: spell_level = json.get(spellKey, "level")]
	[h: spell_id = json.get(spellKey, "id")]
	[h: spellKeyObj = json.set("", "spell_name", spell_name, "spell_tradition", spell_tradition, "spell_level", spell_level, "spell_id", spell_id)]
	[h: spellKeyObjs = json.append(spellKeyObjs, spellKeyObj)]
  }]
}]


[dialog5('Test'): {[r: string(spellKeyObjs)]}]
