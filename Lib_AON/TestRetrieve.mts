[h: itemID = "armor-3"]
[h, macro("GetAonItemByID@Lib:AON"): itemID]
[h: itemData = macro.return]

[h: keys = json.fields(itemData)]
[h: keyCount = listCount(keys)]

[h: output = ""]

[h, for(i, 0, keyCount), code: {
	[h: key = listGet(keys, i)]
	[h: lowerKey = lower(key)]
	[h: val = json.get(itemData, key)]
	[h: valType = json.type(val)]

	[h, if(valType == "UNKNOWN"): valType = "VALUE"]

	[h, if(valType == "OBJECT" || valType == "ARRAY"), code: {
		[h: val = json.indent(val, 2)]
	}]
	[h, if(indexOf(lowerKey, "markdown") == -1), code: {
		[h: output = output + "<b>" + key + "</b>: " + val + "<br>"]
	}]
}]

[r: output]
