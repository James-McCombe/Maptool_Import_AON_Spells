[h: 'This macro will update a token with a statblock from Archives of Nethys']
[h: ids = getSelected()]
[h: assert(json.length(ids) > 0, "Select at least one token.", 0)]

[h: status = input("url|https://2e.aonprd.com/Spells.aspx?ID=1439|Enter URL|TEXT|WIDTH=60")]
[h: abort(status)]

[h: html = REST.get(url, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]
[h: startTag = '<h1 class="title">']
[h: endTag = '<h2 class="title">']
[h: endTag2 = '<div class="clear">']

[h: startPos = indexOf(html, startTag)]
[h: subhtml = substring(html, startPos)]
[h: endPos = indexOf(subhtml, endTag)]
[h: endPos2 = indexOf(subhtml, endTag2)]
[h, if(endPos < 1): endPos = endPos2, endPos]

[h: Extracted = substring(subhtml, 0, endPos)]

[h: SpellName = ""]
[h: titleFound = indexOf(html, "<title>")]
[h, if(titleFound != -1), code: {
    [h: fidTitle = strfind(html, "(?s)<title>\\s*([^<]+?)\\s*-\\s*")]
    [h: SpellName = trim(getGroup(fidTitle, 1, 1))]
}]

[h: ActionRaw = ""]
[h: ActionFound = indexOf(Extracted, "<span class='action'")]
[h, if(ActionFound != -1), code: {
    [h: ActionSub = substring(Extracted, ActionFound)]
    [h: fidAction = strfind(ActionSub, "<span class='action'[^>]*>\\s*\\[([^\\]]+)\\]")]
    [h: ActionRaw = trim(getGroup(fidAction, 1, 1))]
}]

[h: CastTime = ""]
[h: CastFound = indexOf(Extracted, "<b>Cast</b>")]

[h, if(CastFound != -1), code: {
    [h: fidCast = strfind(Extracted, "(?s)<b>Cast</b>\\s*(.*?)(?:<br\\s*/?>|<hr)")]
    [h: CastTime = trim(getGroup(fidCast, 1, 1))]
    [h: CastTime = trim(replace(CastTime, "<[^>]+>", ""))]
}]

[h: fidLevel = strfind(Extracted, "margin-left:auto;[^>]*>([^<]+)</span>")]
[h: SpellLevel = ""]
[h, if(fidLevel != -1): SpellLevel = getGroup(fidLevel, 1, 1)]

[h: spellTraitsId = strfind(Extracted, '<span class="(trait[^"]*)"><a[^>]*>([^<]+)</a>')]
[h: spellTraitCount = getFindCount(spellTraitsId) +1]
[h: spellTraits = json.append("", "")]
[h, for(i, 1, spellTraitCount), code: {
  [h: traitName = getGroup(spellTraitsId, i, 2)]
  [h: spellTraits = json.append(spellTraits, traitName)]
}]
[h: spellTraits = json.remove(spellTraits, 0)]

[h: fidSource = strfind(Extracted, "<b>Source</b>\\s*<a[^>]*>\\s*(?:<i>)?([^<]+)(?:</i>)?")]
[h: Source = ""]
[h, if(fidSource != -1): Source = getGroup(fidSource, 1, 1)]

[h: '---- Traditions ----']
[h: traditions = json.append("", "")]
[h: hadTraditions = 0]
[h: traditionsFound = indexOf(Extracted, '<b>Traditions</b>')]
[h, if(traditionsFound != -1), code: {
  [h: fidTradLine = strfind(Extracted, "(?s)<b>Traditions</b>\\s*(.*?)<br\\s*/?>")]
  [h: TraditionsBlock = getGroup(fidTradLine, 1, 1)]
  [h: fidTrad = strfind(TraditionsBlock, "(?s)<a[^>]*>(.*?)</a>")]
  [h: tradCount = getFindCount(fidTrad) + 1]
  [h, for(i, 1, tradCount), code: {
    [h: tradInner = getGroup(fidTrad, i, 1)]
    [h: tradName = trim(replace(tradInner, "<[^>]+>", ""))]
    [h: traditions = json.append(traditions, tradName)]
    [h: hadtraditions = 1]
  }]
};{}]
[h, if(hadTraditions == 1): traditions = json.remove(traditions, 0)]

[h: '---- Bloodlines ----']
[h: bloodlines = json.append("", "")]  <!-- default [""] -->
[h: hadBloodline = 0]

[h: BloodlinesFound = indexOf(Extracted, '<b>Bloodline</b>')]
[h, if(BloodlinesFound != -1), code: {
  [h: fidBloodLine = strfind(Extracted, "(?s)<b>Bloodline</b>\\s*(.*?)<br\\s*/?>")]
  [h: BloodlineBlock = getGroup(fidBloodLine, 1, 1)]
  [h: fidBlood = strfind(BloodlineBlock, "(?s)<a[^>]*>(.*?)</a>")]
  [h: bloodCount = getFindCount(fidBlood) + 1]
  [h, for(i, 1, bloodCount), code: {
    [h: bloodInner = getGroup(fidBlood, i, 1)]
    [h: bloodName  = trim(replace(bloodInner, "<[^>]+>", ""))]  <!-- strip tags -->
    [h: bloodlines = json.append(bloodlines, bloodName)]
    [h: hadBloodline = 1]
  }]
}]
[h, if(hadBloodline == 1): bloodlines = json.remove(bloodlines, 0)]

[h: '---- Mysteries ----']
[h: spellMysteries = json.append("", "")]  <!-- default [""] -->
[h: hadMysteries = 0]

[h: MysteriesFound = indexOf(Extracted, '<b>Mysteries</b>')]
[h: MysteryFound = indexOf(Extracted, '<b>Mystery</b>')]

[h, if(MysteriesFound != -1 || MysteryFound != -1), code: {
  [h: fidMysteriesLine = strfind(Extracted, "(?s)<b>Myster(?:y|ies)</b>\\s*(.*?)<br\\s*/?>")]
  [h: MysteriesBlock = getGroup(fidMysteriesLine, 1, 1)]
  [h: fidMysteries = strfind(MysteriesBlock, "(?s)<a[^>]*>(.*?)</a>")]
  [h: MysteriesCount = getFindCount(fidMysteries) + 1]
  [h, for(i, 1, MysteriesCount), code: {
    [h: MysteriesInner = getGroup(fidMysteries, i, 1)]
    [h: MysteriesName  = trim(replace(MysteriesInner, "<[^>]+>", ""))]  <!-- strip tags -->
    [h, if(MysteriesName != ""): spellMysteries = json.append(spellMysteries, MysteriesName)]
    [h, if(MysteriesName != ""): hadMysteries = 1]
  }]
}]
[h, if(hadMysteries == 1): spellMysteries = json.remove(spellMysteries, 0)]

[h: '---- Deities ----']
[h: spellDeities = json.append("", "")]  <!-- default [""] -->
[h: hadDeities = 0]

[h: DeitiesFound = indexOf(Extracted, '<b>Deities</b>')]
[h: DeityFound = indexOf(Extracted, '<b>Deity</b>')]

[h, if(DeitiesFound != -1 || DeityFound != -1) , code: {
  [h: fidDeitiesLine = strfind(Extracted, "(?s)<b>Deit(?:y|ies)</b>\\s*(.*?)<br\\s*/?>")]
  [h: DeitiesBlock = getGroup(fidDeitiesLine, 1, 1)]
  [h: fidDeities = strfind(DeitiesBlock, "(?s)<a[^>]*>(.*?)</a>")]
  [h: DeitiesCount = getFindCount(fidDeities) + 1]
  [h, for(i, 1, DeitiesCount), code: {
    [h: DeitiesInner = getGroup(fidDeities, i, 1)]
    [h: DeitiesName  = trim(replace(DeitiesInner, "<[^>]+>", ""))]  <!-- strip tags -->
    [h, if(DeitiesName != ""): spellDeities = json.append(spellDeities, DeitiesName)]
    [h, if(DeitiesName != ""): hadDeities = 1]
  }]
}]
[h, if(hadDeities == 1): spellDeities = json.remove(spellDeities, 0)]

[h: fidRange = strfind(Extracted, "(?s)<b>Range</b>\\s*(.*?)(?:;|<br\\s*/?>|<hr)")]
[h: Range = ""]
[h: RangeFound = indexOf(Extracted, '<b>Range</b>')]
[h, if(RangeFound != -1): Range = trim(getGroup(fidRange, 1, 1))]

[h: Area = ""]
[h: AreaFound = indexOf(Extracted, "<b>Area</b>")]
[h, if(AreaFound != -1), code: {
    [h: fidArea = strfind(Extracted, "(?s)<b>Area</b>\\s*(.*?)(?:<br\\s*/?>|<hr)")]
    [h: Area = trim(getGroup(fidArea, 1, 1))]
    [h: Area = trim(replace(Area, "<[^>]+>", ""))]
}]

[h: fidTargets = strfind(Extracted, "(?s)<b>Targets</b>\\s*(.*?)(?:;|<br\\s*/?>|<hr)")]
[h: Targets = ""]
[h: TargetsFound = indexOf(Extracted, '<b>Targets</b>')]
[h, if(TargetsFound != -1): Targets = trim(getGroup(fidTargets, 1, 1))]

[h: fidDuration = strfind(Extracted, "(?s)<b>Duration</b>\\s*(.*?)(?:<br\\s*/?>|<hr)")]
[h: Duration = ""]
[h: DurationFound = indexOf(Extracted, '<b>Duration</b>')]
[h, if(DurationFound != -1): Duration = trim(getGroup(fidDuration, 1, 1))]

[h: fidDefense = strfind(Extracted, "(?s)<b>Defense</b>\\s*(.*?)(?:<hr|<br\\s*/?>)")]
[h: SpellDefense = ""]
[h: DefenseFound = indexOf(Extracted, '<b>Defense</b>')]
[h, if(DefenseFound != -1): SpellDefense = trim(getGroup(fidDefense, 1, 1))]

[h: heightenedList = json.append("", "")]  <!-- default [""] -->
[h: hadHeightened = 0]

[h: firstHR  = indexOf(Extracted, "<hr")]
[h: secondHR = if(firstHR != -1, indexOf(Extracted, "<hr", firstHR + 1), -1)]
[h: afterHR  = if(secondHR != -1, substring(Extracted, secondHR), "")]

[h: fidH = strfind(afterHR, "(?s)(<b>Heightened[^<]*</b>\\s*.*?)(?=<b>Heightened|</span>)")]

[h: hCount = getFindCount(fidH) + 1]

[h, for(i, 1, hCount), code: {
    [h: hBlock = getGroup(fidH, i, 1)]

    <!-- Clean it for Text field storage -->
    [h: hBlock = replace(hBlock, "(?i)<br\\s*/?>", "<br>")]
    [h: hBlock = replace(hBlock, "&nbsp;", " ")]
    [h: hBlock = trim(replace(hBlock, "<[^>]+>", ""))]
    [h: hBlock = replace(hBlock, "'", "&#39;")]
    [h: hBlock = replace(hBlock, '"', "&#34;")]

    [h, if(hBlock != ""): heightenedList = json.append(heightenedList, hBlock)]
    [h, if(hBlock != ""): hadHeightened = 1]
}]

[h, if(hadHeightened == 1): heightenedList = json.remove(heightenedList, 0)]

[h: SpellDescription = ""]
[h: firstHR  = indexOf(Extracted, "<hr")]
[h: secondHR = if(firstHR != -1, indexOf(Extracted, "<hr", firstHR + 1), -1)]

[h: midBlock = if(firstHR != -1 && secondHR != -1, substring(Extracted, firstHR, secondHR), "")]

<!-- remove the first <hr ...> tag itself -->
[h: hrEnd = if(midBlock != "", indexOf(midBlock, ">"), -1)]
[h: midBlock = if(hrEnd != -1, substring(midBlock, hrEnd + 1), midBlock)]

<!-- stop before the outcome section if present -->
[h: cut1 = indexOf(midBlock, "<b>Critical Success</b>")]
[h: cut2 = indexOf(midBlock, "<b>Critical Failure</b>")]
[h: cut3 = indexOf(midBlock, "<b>Success</b>")]
[h: cut4 = indexOf(midBlock, "<b>Failure</b>")]

[h: cutPos = -1]
[h: cutPos = if(cut1 != -1, cut1, cutPos)]
[h: cutPos = if(cutPos == -1 || (cut2 != -1 && cut2 < cutPos), cut2, cutPos)]
[h: cutPos = if(cutPos == -1 || (cut3 != -1 && cut3 < cutPos), cut3, cutPos)]
[h: cutPos = if(cutPos == -1 || (cut4 != -1 && cut4 < cutPos), cut4, cutPos)]

[h, if(cutPos != -1): SpellDescription = subString(midBlock, 0, cutPos); SpellDescription = midBlock)]

[h: SpellDescription = replace(SpellDescription, "(?i)<br\\s*/?>", "<br>")]
[h: SpellDescription = trim(replace(SpellDescription, "<[^>]+>", ""))]
[h: SpellDescription = trim(replace(SpellDescription, "&nbsp;", " "))]
[h: SpellDescription = replace(SpellDescription, "'", "&#39;")]
[h: SpellDescription = replace(SpellDescription, '"', "&#34;")]

[h: CritSuccessRaw = ""]
[h: fidCS = strfind(Extracted, "(?s)<b>Critical Success</b>\\s*(.*?)(?=<b>Success</b>|<b>Failure</b>|<b>Critical Failure</b>|<b>Heightened|<hr|</span>)")]
[h: CritSuccessFound = indexOf(Extracted, '<b>Critical Success</b>')]
[h, if(CritSuccessFound != -1): CritSuccessRaw = getGroup(fidCS, 1, 1)]
[h: CritSuccess = CritSuccessRaw]
[h: CritSuccess = replace(CritSuccess, "(?i)<br\\s*/?>", "<br>")]
[h: CritSuccess = replace(CritSuccess, "&nbsp;", " ")]
[h: CritSuccess = trim(replace(CritSuccess, "<[^>]+>", ""))]
[h: CritSuccess = replace(CritSuccess, "'", "&#39;")]
[h: CritSuccess = replace(CritSuccess, '"', "&#34;")]

[h: SuccessRaw = ""]
[h: fidS = strfind(Extracted, "(?s)<b>Success</b>\\s*(.*?)(?=<b>Failure</b>|<b>Critical Failure</b>|<b>Heightened|<hr|</span>)")]
[h: SuccessFound = indexOf(Extracted, '<b>Success</b>')]
[h, if(SuccessFound != -1): SuccessRaw = getGroup(fidS, 1, 1)]

[h: Success = SuccessRaw]
[h: Success = replace(Success, "(?i)<br\\s*/?>", "<br>")]
[h: Success = replace(Success, "&nbsp;", " ")]
[h: Success = trim(replace(Success, "<[^>]+>", ""))]
[h: Success = replace(Success, "'", "&#39;")]
[h: Success = replace(Success, '"', "&#34;")]

[h: FailureRaw = ""]
[h: fidF = strfind(Extracted, "(?s)<b>Failure</b>\\s*(.*?)(?=<b>Critical Failure</b>|<b>Heightened|<hr|</span>)")]
[h: FailureFound = indexOf(Extracted, '<b>Failure</b>')]
[h, if(FailureFound != -1): FailureRaw = getGroup(fidF, 1, 1)]

[h: Failure = FailureRaw]
[h: Failure = replace(Failure, "(?i)<br\\s*/?>", "<br>")]
[h: Failure = replace(Failure, "&nbsp;", " ")]
[h: Failure = trim(replace(Failure, "<[^>]+>", ""))]
[h: Failure = replace(Failure, "'", "&#39;")]
[h: Failure = replace(Failure, '"', "&#34;")]

[h: CritFailureRaw = ""]
[h: fidCF = strfind(Extracted, "(?s)<b>Critical Failure</b>\\s*(.*?)(?=<b>Heightened|<hr|</span>)")]
[h: CritFailureFound = indexOf(Extracted, '<b>Critical Failure</b>')]
[h, if(CritFailureFound != -1): CritFailureRaw = getGroup(fidCF, 1, 1)]

[h: CritFailure = CritFailureRaw]
[h: CritFailure = replace(CritFailure, "(?i)<br\\s*/?>", "<br>")]
[h: CritFailure = replace(CritFailure, "&nbsp;", " ")]
[h: CritFailure = trim(replace(CritFailure, "<[^>]+>", ""))]
[h: CritFailure = replace(CritFailure, "'", "&#39;")]
[h: CritFailure = replace(CritFailure, '"', "&#34;")]

[r: 'SpellName: ' + SpellName + '<br />']
[r: 'ActionRaw: ' + ActionRaw + '<br />']
[r: 'CastTime: ' + CastTime + '<br />']
[r: 'SpellLevel: ' + SpellLevel + '<br />']
[r: 'Traits: ' + spellTraits + '<br />']
[r: 'Source: ' + Source + '<br />']
[r: 'Traditions: ' + traditions + '<br />']
[r: 'Deities: ' + spellDeities + '<br />']
[r: 'Bloodlines: ' + bloodlines + '<br />']
[r: 'Mysteries: ' + spellMysteries + '<br />']
[r: 'Range: ' + Range + '<br />']
[r: 'Area: ' + Area + '<br />']
[r: 'Targets: ' + Targets + '<br />']
[r: 'Duration: ' + Duration + '<br />']
[r: 'SpellDefense: ' + SpellDefense + '<br />']
[r: 'HeightenedList: ' + heightenedList + '<br />']
[r: 'SpellDescription: ' + SpellDescription + '<br />']
[r: 'URL: ' + URL + '<br />']

[frame5("Frame Test"): {
	[r: URL + '<br />' + Extracted]
}]

