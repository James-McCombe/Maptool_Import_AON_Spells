[h: 'This macro will update a token with a statblock from Archives of Nethys']
[h: ids = getSelected()]
[h: assert(json.length(ids) > 0, "Select at least one token.", 0)]

[h: status = input("spellID|1565|Enter URL|TEXT|WIDTH=60")]
[h: abort(status)]

[h: urlIndex = 'https://elasticsearch.aonprd.com/json-data/aon73-index.json']
[h: htmlIndex = REST.get(urlIndex, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
[h: assert(htmlIndex != "", "Failed to load AON index file.", 0)]
[h: assert(json.type(htmlIndex) == "OBJECT", "AON index response was not a JSON object.", 0)]

[h: targetSpell = "spell-" + spellID]
[h: indexKeyFound = ""]

[h: keys = json.fields(htmlIndex)]
[h: keyCount = listcount(keys)]

[h, for(i, 0, keyCount), code: {
  [h, if(indexKeyFound == ""), code: {
    [h: key = listGet(keys, i)]
    [h: arr = json.get(htmlIndex, key)]
    [h: found = json.contains(arr, targetSpell)]
    [h, if(found == 1): indexKeyFound = key]
  }]
}]

[h: "Target: " + targetSpell + "<br>"]
[h: "Index Key: " + indexKeyFound + "<br />"]

[h: assert(indexKeyFound != "", "Spell not found in aon73-index.json: " + targetSpell, 0)]
[h: urlData = 'https://elasticsearch.aonprd.com/json-data/' + indexKeyFound + '.json']
[h: htmlData = REST.get(urlData, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
[h: assert(htmlData != "", "Failed to load AON data file: " + indexKeyFound + ".json", 0)]
[h: assert(json.type(htmlData) == "ARRAY", "AON bucket response was not a JSON array.", 0)]

[h: spellData = ""]

[h: dataCount = json.length(htmlData)]
[h, for(i, 0, dataCount), code: {
  [h, if(spellData == ""), code: {
    [h: obj = json.get(htmlData, i)]
    [h: objID = json.get(obj, "id")]
    [h, if(objID == targetSpell): spellData = obj]
  }]
}]

[h: assert(spellData != "", "Spell object not found in bucket file: " + targetSpell, 0)]

[h: spell_actions = json.get(spellData, "actions")]
[h: spell_bloodline_markdown = json.get(spellData, "bloodline_markdown")]
[h: spell_component = json.get(spellData, "component")]
[h: spell_domain_markdown = json.get(spellData, "domain_markdown")]
[h: spell_element = json.get(spellData, "element")]
[h: spell_heighten = json.get(spellData, "heighten")]
[h: spell_heighten_group = json.get(spellData, "heighten_group")]
[h: spell_heighten_level = json.get(spellData, "heighten_level")]
[h: spell_id = json.get(spellData, "id")]
[h: spell_legacy_id = json.get(spellData, "legacy_id")]
[h: spell_level = json.get(spellData, "level")]
[h: spell_markdown = json.get(spellData, "markdown")]
[h: spell_mystery_markdown = json.get(spellData, "mystery_markdown")]
[h: spell_name = json.get(spellData, "name")]
[h: spell_pfs = json.get(spellData, "pfs")]
[h: spell_primary_source_category = json.get(spellData, "primary_source_category")]
[h: spell_range = json.get(spellData, "range")]
[h: spell_range_raw = json.get(spellData, "range_raw")]
[h: spell_rarity = json.get(spellData, "rarity")]
[h: spell_rarity_id = json.get(spellData, "rarity_id")]
[h: spell_release_date = json.get(spellData, "release_date")]
[h: spell_remaster_id = json.get(spellData, "remaster_id")]
[h: spell_resistance = json.get(spellData, "resistance")]
[h: spell_saving_throw_markdown = json.get(spellData, "saving_throw_markdown")]
[h: spell_school = json.get(spellData, "school")]
[h: spell_search_markdown = json.get(spellData, "search_markdown")]
[h: spell_source = json.get(spellData, "source")]
[h: spell_source_category = json.get(spellData, "source_category")]
[h: spell_source_markdown = json.get(spellData, "source_markdown")]
[h: spell_speed = json.get(spellData, "speed")]
[h: spell_spell_type = json.get(spellData, "spell_type")]
[h: spell_summary_markdown = json.get(spellData, "summary_markdown")]
[h: spell_target_markdown = json.get(spellData, "target_markdown")]
[h: spell_tradition = json.get(spellData, "tradition")]
[h: spell_tradition_markdown = json.get(spellData, "tradition_markdown")]
[h: spell_trait = json.get(spellData, "trait")]
[h: spell_trait_markdown = json.get(spellData, "trait_markdown")]
[h: spell_type = json.get(spellData, "type")]
[h: spell_url = json.get(spellData, "url")]
[h: spell_weakness = json.get(spellData, "weakness")]

[r: 'spell_name: ' + spell_name + '<br />']
[r: 'spell_tradition: ' + spell_tradition + '<br />']
[r: 'spell_level: ' + spell_level + '<br />']
[r: 'spell_id: ' + spell_id + '<br />']
[r: '<br />']

[h: spell_heighten_markdown = ""]
[h: spell_summary = substring(spell_markdown, indexOf(spell_markdown, '---', 0) +4)]
[h: close_summary_found = indexOf(spell_summary, '---')]
[h, if(close_summary_found > -1), code: {
	[h: spell_heighten_markdown = substring(spell_summary, close_summary_found +4)]
}]

[h, if(close_summary_found != -1), code: {
	[h: spell_summary = substring(spell_summary, 0, close_summary_found)]
}]
[h: spell_summary = replace(spell_summary, '\\[', "&#91;")]
[h: spell_summary = replace(spell_summary, '\\]', "&#93;")]

[h: 'spell_summary = replace(spell_summary, "\\[([^\\]]+)\\]\\([^\\)]+\\)", "")']  
[h: 'spell_summary = replace(spell_summary, "\\*\\*", "")']
[h: 'spell_summary = replace(spell_summary, "\\s+", " ")']
[h: 'spell_summary = trim(spell_summary)']

[h: src = spell_summary]
[h: out = ""]
[h: pos = 0]

[h: fid = strfind(src, "(?i)\\b(\\d+d\\d+(?:\\+\\d+)?)\\b")]
[h: mCount = getFindCount(fid) +1]

[h, if(mCount > 0), code: {
  [h, for(i, 1, mCount), code: {
    [h: dice = getGroup(fid, i, 1)]
    [h: start = getGroupStart(fid, i, 0)]
    [h: end   = getGroupEnd(fid, i, 0)]

    [h: out = out + substring(src, pos, start)]
    [h: out = out + "[e: " + dice + "]"]
    [h: pos = end]
  }]
}]

[h: out = out + substring(src, pos)]
[h: spell_summary = out]
[r: execMacro(spell_summary)]
[r: '<br />spell_heighten_markdown: ' + spell_heighten_markdown + '<br />']

