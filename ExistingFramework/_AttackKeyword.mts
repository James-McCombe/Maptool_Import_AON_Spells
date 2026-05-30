[h,if(initiativeSize()>0 && Class!="Eidolon"),code:{
[h:AttacksThisRound=min(AttacksThisRound+1,2)]
}]

[h,if(initiativeSize()>0 && Class=="Eidolon"),code:{

[h:setProperty("AttacksThisRound",min(AttacksThisRound+1,2),MySummoner)]
}]


[h,if(initiativeSize()>0 && isNPC()),code:{
[setLibProperty("LastNPCAttack", getInitiativeToken(), "Lib:Pf2")]
	
}]

