[h: "Load Macro Arguments"]
[h: rawArgs = macro.args]
[h: args = if(json.type(rawArgs) == "OBJECT", rawArgs, "{}")]
[h: runTimestamp = if(json.contains(args, "runTimestamp"), json.get(args, "runTimestamp"), "")]
[h: forceSpellUpdate = if(json.contains(args, "forceSpellUpdate"), number(json.get(args, "forceSpellUpdate")), 0)]
[h: existingCount = number(getProperty("AON-Spell-Index-Count", "Lib:AON"))]
[h: shouldRefresh = if(forceSpellUpdate == 1 || existingCount == 0, 1, 0)]
[h, if(shouldRefresh == 0), code: {
  [r: "Spell library already exists (" + existingCount + " entries).<br>"]
  [r: "Check 'Force Spell Update' to rebuild from AON."]
  [h: abort(0)]
}]

[h: "Load the top-level AON index. Each key points to a bucket JSON file."]
[h: indexUrl = "https://elasticsearch.aonprd.com/json-data/aon73-index.json"]
[h: indexJson = REST.get(indexUrl, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
[h: assert(indexJson != "", "Failed to load AON index file.", 0)]
[h: assert(json.type(indexJson) == "OBJECT", "AON index response was not a JSON object.", 0)]

[h: "Collect only bucket keys that contain spell IDs."]
[h: bucketKeys = json.append("", "")]
[h: spellIndex = json.append("", "")]
[h: indexKeys = json.fields(indexJson)]
[h: keyCount = listCount(indexKeys)]

[h: "Pass 1: build bucketKeys list."]
[h, for(i, 0, keyCount), code: {
  [h: bucketKey = listGet(indexKeys, i)]
  [h: bucketArr = json.get(indexJson, bucketKey)]
  [h: hasSpell = indexOf(string(bucketArr), "spell-")]
  [h, if(hasSpell != -1): bucketKeys = json.append(bucketKeys, bucketKey)]
}]

[h, if(json.length(bucketKeys) > 1): bucketKeys = json.remove(bucketKeys, 0)]

[h: "Pass 2: loop buckets, then loop rows (2-level nested loop max)."]
[h, for(i, 0, json.length(bucketKeys)), code: {
  [h: bucketKey = json.get(bucketKeys, i)]
  [h: bucketUrl = "https://elasticsearch.aonprd.com/json-data/" + bucketKey + ".json"]
  [h: bucketData = REST.get(bucketUrl, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
  [h: assert(json.type(bucketData) == "ARRAY", "Bucket response was not a JSON array: " + bucketKey, 0)]

  [h: "Keep spell rows only and include bucketKey in each export object."]
    [h: rowCount = json.length(bucketData)]
  [h, for(j, 0, rowCount), code: {
      [h: row = json.get(bucketData, j)]
      [h: rowId = json.get(row, "id")]
      [h: isSpell = if(startsWith(rowId, "spell-"), 1, 0)]
      [h: spellObj = if(isSpell == 1, json.set("",
        "id", rowId,
        "name", json.get(row, "name"),
        "level", json.get(row, "level"),
        "tradition", json.get(row, "tradition"),
        "source", json.get(row, "source"),
        "release_date", json.get(row, "release_date"),
        "url", json.get(row, "url"),
        "bucketKey", bucketKey
      ), "")]
      [h, if(isSpell == 1): spellIndex = json.append(spellIndex, spellObj)]
  }]
}]

[h: "Remove the starter placeholder item if we appended real data."]
[h, if(json.length(spellIndex) > 1): spellIndex = json.remove(spellIndex, 0)]

[h: "Persist index + count on Lib:AON for later importer steps."]
[h: setProperty("AON-Spell-Index", spellIndex, "Lib:AON")]
[h: setProperty("AON-Spell-Index-Count", json.length(spellIndex), "Lib:AON")]

[h: cInfo = getInfo("client")]
[h: currentTime = json.get(cInfo,"timeDate")]
[r: setProperty("AON-Spell-Last_Update", currentTime, "Lib:AON")]

[h: "Quick debug output so you can verify the macro result immediately."]
[r: "AON-Spell-Index count: " + json.length(spellIndex) + "<br>"]
[r: "Sample row:<br>"]
[r: json.get(spellIndex, 0)]
