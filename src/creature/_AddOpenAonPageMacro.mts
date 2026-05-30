[h: args = macro.args]
[h: tokenID = args]
[h, if(args != "" && json.type(args) == "OBJECT" && json.contains(args, "tokenID")): tokenID = json.get(args, "tokenID")]

[h: assert(tokenID != "", "No token id passed to _AddOpenAonPageMacro.", 0)]

[h: macroCommand = "[h: aonURL = getProperty('AON_URL')]"]
[h: macroCommand = macroCommand + decode("%0A") + "[h: assert(aonURL != '', 'AON_URL is blank.', 0)]"]
[h: macroCommand = macroCommand + decode("%0A") + "[g,r: '<html><a href=' + aonURL + '>Open AoN Page</a></html>']"]
[h: macroProps = json.set("{}", "label", "OPEN_AON", "command", macroCommand, "autoExecute", 1, "playerEditable", 1, "group", "z_AON")]
[h: existingIndexes = ""]
[h, token(tokenID): existingIndexes = getMacroIndexes("OPEN_AON")]
[h, if(existingIndexes == ""): createMacro(macroProps, tokenID)]
[h, if(existingIndexes != ""), code: {
	[h: existingIndex = listGet(existingIndexes, 0)]
	[h, token(tokenID): setMacroProps(existingIndex, macroProps, "json")]
}]