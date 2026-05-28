[h:Name=json.get(macro.args,"Name")]
[h:FeatLevel=json.get(macro.args,"FeatLevel")]
[h:Traits=json.get(macro.args,"Traits")]
[h:Trigger=json.get(macro.args,"Trigger")]
[h:Requirements=json.get(macro.args,"Requirements")]
[h:Action=json.get(macro.args,"Action")]
[h:Text=json.get(macro.args,"Text")]

[h,if(StarfinderSkills), code:{
	[borderColor="#9ddae6"]
	[bcgColor="#2d4e6a"]
	[outerBorder="#9ddae6"]
	[innerBorder="#5a3994"]
	[innerBcg="#ffffff"]
	[style="solid"]
};{	
	[borderColor="#d9c484"]
	[bcgColor="#5a0308"]
	[outerBorder="#dbc385"]
	[innerBorder="#002a17"]
	[innerBcg="#FAF9F8"]
	[style="inset"]
}]

[h,if(json.contains(Traits, "Attuned")), code: {
	[macro("attunedLogic@Lib:Pf2"):""]
}]
[h,if(json.contains(Traits, "Cycle")), code: {
	[macro("cycleLogic@Lib:Pf2"):""]
}]

[h,if(json.contains(Traits,"Metamagic") && json.contains(Feats,"Metamagic Mastery")), code:{
	[Action="F"]
};{}]
[h:Traits=if(json.contains(Traits, "Sanctified") && Sanctified !="None", json.append(Traits, Sanctified), Traits)]
[h,if(json.contains(Traits, "Positive")), code: {
	[Traits=json.remove(Traits,  json.indexOf(Traits,"Positive"))]
	[Traits=json.append(Traits, "Vitality")]
}]
[h,if(json.contains(Traits, "Negative")), code: {
	[Traits=json.remove(Traits,  json.indexOf(Traits,"Negative"))]
	[Traits=json.append(Traits, "Void")]
}]

[h,if(json.contains(Traits, "Good")), code: {
	[Traits=json.remove(Traits,  json.indexOf(Traits,"Good"))]
	[Traits=json.append(Traits, "Holy")]
}]

[h,if(json.contains(Traits, "Evil")), code: {
	[Traits=json.remove(Traits,  json.indexOf(Traits,"Evil"))]
	[Traits=json.append(Traits, "Unholy")]
}]

[h:SpecialTrait=if(json.contains(Traits,"Uncommon"), "Uncommon",  "")]
[h:SpecialTrait=if(json.contains(Traits,"Rare"), "Rare", SpecialTrait)]
[h:TraitsToSort=Traits]
[h,if(SpecialTrait != ""), code: {
	[TraitsToSort=json.remove(TraitsToSort, json.indexOf(TraitsToSort,SpecialTrait))]
}]
[h:TraitsToSort=json.unique(TraitsToSort)]

[h:TraitsToSort=json.sort(TraitsToSort)]
[h:Traits=json.removeAll(Traits, TraitsToSort)]

[h,foreach(trait, TraitsToSort), code:{
	[Traits=json.append(Traits, trait)]
}]
	

[h:xTraits=json.toList(Traits)]
[h:UncommonTrait=if(json.contains(Traits,"Uncommon"), 1, 0)]
[h:UncommonTrait=if(json.contains(Traits,"Rare"), 1, UncommonTrait)]
[h:UncommonColor="AE531F"]
[h:UncommonColor=if(json.contains(Traits,"Rare"), "002664", UncommonColor)]

[h:NumberOfTraits=listCount(xTraits)]
[h:TraitHtml=if(NumberOfTraits == 0, "", '<table border="0", bgcolor='+bcgColor+', style="font-size:13pt;font-family:Century Gothic;font-weight:bold;border-spacing:0px;"><tr>')]
[h, for(i, 0, NumberOfTraits), code: {
	[h:TraitName=ListGet(xTraits, i)]
	[h:TraitCell=if(UncommonTrait==1 && i==0, " <td style='border:3px solid "+borderColor+";background-color:#"+UncommonColor+";'><font color='white'>&nbsp; "+TraitName+" &nbsp;</font> </td>", " <td style='border:3px solid "+borderColor+";'><font color='white'>&nbsp; "+TraitName+" &nbsp;</font> </td>")]
	[h:TraitHtml=TraitHtml + TraitCell]
}]
[h:TraitHtml=if(NumberOfTraits == 0, TraitHtml, TraitHtml + "</tr></table>")]


[h:Text=replace(Text, "<hr/>", "<hr><font color='black'>")]
[h:Text=replace(Text, "<hr />", "<hr><font color='black'>")]
[h:Text=replace(Text, "<hr>", "<hr><font color='black'>")]
[h:Text=replace(Text, "</h3>","</h3><font color='black'>")]
[h:Text=replace(Text, "</h2>","</h2><font color='black'>")]
[h:Text=replace(Text, "<h3>","<h3><font color='black'>")]
[h:Text=replace(Text, "<h2>","<h2><font color='black'>")]
[h:Text=replace(Text, "<font color='black'><font color='black'>", "<font color='black'>")]


 <div style="
background-color: {outerBorder};
   width: 270px;
  border: 1px solid {outerBorder};
  border-style: {style};
  padding: 0px;
  margin: 0px;
 ">
<div style="
background-color: {innerBcg};
  width: 100%;
  border: 5px solid {innerBorder};
    padding: 5px;
  margin: 1px;
 ">

 
  <table style="width:100%;font-size:16pt;font-family:Arial;margin:0px;padding:0px;">
  <tr>
    <td><strong><font color="black">[r:Name] </strong>
        [if(Action=="1"), code:{<img height=15 width=15 src="asset://e7876556a71025c1a63de5aa47553c43" />[h:assert(if(initiativeSize()>0 && state.4Action==0 && state.3Action == 0 && state.2Action == 0 && state.1Action == 0,0,1),"You have used all your actions!",0)]}]
        [if(Action=="2"), code:{<img height=13 width=20 src="asset://6d8ac5fce8e04fc97996d921acea5499" />	[h:assert(if(initiativeSize()>0 && state.4Action==0 && state.3Action == 0 && state.2Action == 0,0,1),"You do not have enough time for this action!",0)]}]
        [if(Action=="3"), code:{<img height=15 width=31 src="asset://ba42444f6e7189a4450a18edb9aea022" />[h:assert(if(initiativeSize()>0 && state.4Action==0 && state.3Action == 0,0,1),"You do not have time for this action!",0)]}]
        [if(Action=="R"), code:{<img height=18 width=18 src="asset://350ae7b3054be8a96f62ddf0f13de5ba" />[macro("Reaction@Lib:Actions"):""]}]
        [if(Action=="F"), code:{<img height=15 width=15 src="asset://70ad3250dee31e0250014fb92ed1e159" />}]  
        [if(Action!="" && Action!="1" && Action!="2" && Action!="3" && Action!="R" && Action!="F"), code:{[r:Action]}]
    </td>
  <td style="text-align:right"><b><font color="black">Feat [r:FeatLevel]</b></td>
  </tr></table>
  <div style="border-top:2px solid black;padding: 3px 0px 0px 0px;width: 270px;">
 [r:TraitHtml]</div>
	[if(Trigger=="" && Requirements==""),code:{};{<div style="font-family:Arial;width: 270px;padding: 3px 0px 0px 0px;"><font color="black">}]
    [if(Trigger==""),code:{};{
                            <b>Trigger</b> [r:Trigger][r:if(Requirements=="",'</div><div style="border-top:1px solid black;"><font color="black">', '<br>')] 
                            }]
   [if(Requirements==""),code:{};{
                            <b>Requirements</b> [r:Requirements]</div><div style="border-top:1px solid black;"><font color="black">
                            }]  
   
   <font color="black">[r:Text]
</div>
 </div>  
  </div>
	</div>
  [h:Feats=if(json.contains(Feats,Name), Feats, json.append(Feats,Name))]

[if(Action=="1"), code:{[macro("Single Action@Lib:Actions"):""]}]
[if(Action=="2"), code:{[macro("Two-Action Activity@Lib:Actions"):""]}]
[if(Action=="3"), code:{[macro("Three-Action Activity@Lib:Actions"):""]}]
