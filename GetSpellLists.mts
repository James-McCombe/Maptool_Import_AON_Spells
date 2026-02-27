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

[h, if(json.length(bucketKeys) > 1): bucketKeys = json.remove(bucketKeys, 0)]

[dialog5('Test'): {[r: string(bucketKeys)]}]
