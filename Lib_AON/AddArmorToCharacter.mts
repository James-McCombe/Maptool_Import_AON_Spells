[h: 'This macro will update a token with item data from Archives of Nethys']
[h: ids = getSelected()]
[h: assert(json.length(ids) > 0, "Select at least one token.", 0)]

[h: status = input("itemID|armor-3|Enter Item ID|TEXT|WIDTH=60")]
[h: abort(status)]

[h: itemID = "armor-3"]
[h, macro("GetAonItemByID@Lib:AON"): itemID]
[h: itemData = macro.return]

[h: assert(itemData != "", "Failed to retrieve item data.", 0)]

[h: itemName = json.get(itemData, "name")]
[h: itemLevel = json.get(itemData, "level")]
[h: itemPrice = json.get(itemData, "price_raw")]
[h: itemACBonus = json.get(itemData, "ac")]
[h: itemDexCap = json.get(itemData, "dex_cap")]
[h: itemCheckPenalty = json.get(itemData, "check_penalty")]
[h: itemSpeedPenalty = json.get(itemData, "speed_penalty")]
[h: itemStrength = json.get(itemData, "strength")]
[h: itemGroup = json.get(itemData, "armor_group_markdown")]
[h: itemTraits = json.get(itemData, "trait")]

[h: macroText = '<h3>' + itemName + '</h3>']
[h: macroText = macroText + '<b>Level:</b> ' + itemLevel + '<br>']
[h: macroText = macroText + '<b>Price:</b> ' + itemPrice + '<br>']
[h: macroText = macroText + '<b>AC Bonus:</b> ' + itemACBonus + '<br>']
[h: macroText = macroText + '<b>Dex Cap:</b> ' + itemDexCap + '<br>']
[h: macroText = macroText + '<b>Check Penalty:</b> ' + itemCheckPenalty + '<br>']
[h: macroText = macroText + '<b>Speed Penalty:</b> ' + itemSpeedPenalty + '<br>']
[h: macroText = macroText + '<b>Strength:</b> ' + itemStrength + '<br>']

[h: macroText = macroText + '<b>Traits:</b> ']
[h, if(json.type(itemTraits) == "ARRAY"), code: {
    [h: traitCount = json.length(itemTraits)]
    [h, for(i, 0, traitCount), code: {
        [h: trait = json.get(itemTraits, i)]
        [h: macroText = macroText + trait]
        [h, if(i < traitCount-1): macroText = macroText + ', ']
    }]
}]
[h: macroText = macroText + '<br>']

[h: macroText = macroText + '<b>Group:</b> ' + itemGroup + '<br>']

[h: macroName = 'Armor_' + replace(itemName, " ", "_")]
[h: macroCommand = '[r: "' + macroText + '"]']

[h: newMacro = createMacro(macroName, macroCommand)]
[h: setMacroProps(newMacro, "group=Equipment", "autoExecute=0")]

[macro.return = "Created macro: " + macroName]
