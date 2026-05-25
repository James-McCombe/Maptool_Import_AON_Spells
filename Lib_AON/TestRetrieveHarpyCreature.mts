[h: creatureID = "creature-3046"]
[h, macro("_GetAonItemByID@Lib:AON"): creatureID]
[h: creatureData = macro.return]

[h: assert(creatureData != "", "Failed to retrieve creature data: " + creatureID, 0)]
[h: assert(json.type(creatureData) == "OBJECT", "Creature data was not a JSON object: " + creatureID, 0)]

[h: creatureName = creatureID]
[h, if(json.contains(creatureData, "name")): creatureName = json.get(creatureData, "name")]

[r: "Success: retrieved AoN creature JSON for " + creatureName + " (" + creatureID + ")."]
