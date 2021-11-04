/*
before the leavement on unwhite pianos after whales before phoneing the football before the students in the morning the political queens are going to park a sayment.
today , unbest breakfasts will mourn meanments.
social shoes will be paddleing geting towments.
after the wearments , before uneasy the month , yesterday , the losement is jokeing grabing hydrogens.
on thanking storys , at night , the finding buyment makes a beginment.
*/

{
	function sc(s) {
    	s = s.trim();
    	s = s.charAt(0).toUpperCase() + s.slice(1);
        return s.replace("\\s+"," ");
    }
}


Sentence
 	= (
	 	_ trigger:(_ t:Trigger _ ","? _ {return t})*  _  "the" _  a:Adjective? _ s:NominativFemininumPlural _ p:Futur _ o:Objekt _ "." _
		 	{
            	let xs = trigger.slice(0,trigger.length - 1);
                
               if(xs.length > 0) {
                  return  sc(xs.join(", ") + 
                      " werden " + 
                      trigger[trigger.length - 1] +
                      " die " +
                      a + "en " +
                      s + " " + o  + " " + p + "en.");
                } else {
                  return sc("die " +
                      a + "en " +
                      s + " " + o  + " " + p + "en.");
               }
            } /
	 	_ trigger:(_ t:Trigger _ ","? _ {return t})*  _  "the" _  a:Adjective? _ s:NominativFemininumSingular _ p:Futur _ o:Objekt _ "." _
		 	{
            	let xs = trigger.slice(0,trigger.length - 1);
                
               if(xs.length > 0) {
                  return  sc(xs.join(", ") + 
                      " werden " + 
                      trigger[trigger.length - 1] +
                      " die " +
                      a + "en " +
                      s + " " + o  + " " + p + "en.");
                } else {
                  return sc("die " +
                      a + "en " +
                      s + " " + o  + " " + p + "en.");
               }
            } /
	 	_ trigger:(_ t:Trigger _ ","? _ {return t})*  _  a:Adjective _ s:NominativPluralUnbestimmt _ p:Futur _ o:Objekt _ "." _
		 	{
            	let xs = trigger.slice(0,trigger.length - 1);
                
               if(trigger.length > 1) {
                  return  sc(xs.join(", ") + 
                      " werden " + 
                      trigger[trigger.length - 1] +
                      " die " +
                      a + "en " +
                      s + " " + o  + " " + p + "en.");
                } else if(trigger.length == 1) {
                  return sc(trigger[0] + " werden " + a + "e " +
                      s + " " + o  + " " + p + "en.");
               } else {
                  return sc(a + "e " +
                      s + " werden " + o  + " " + p + "en.");
               }
            } /
	 	_ trigger:(_ t:Trigger _ ","? _ {return t})*  _ "the" _  a:Adjective? _ s:NominativSingularUnbestimmt _ p:Präsens _ o:Objekt _ "." _
		 	{
            	let xs = trigger.slice(0,trigger.length - 1);
                
               if(trigger.length > 1) {
                  return  sc(xs.join(", ") + 
                  	" " + p + "t " + trigger[trigger.length - 1] +
                    " die " + (a ? a + "e " : " ") + s + " " + o);
                } else if(trigger.length == 1) {
                  return sc(trigger[0] + " werden " + a + "e " +
                      s + " " + o  + " " + p + "en.");
               } else {
                  return sc(a + "e " +
                      s + " werden " + o  + " " + p + "en.");
               }
            } 	
    )+


NominativSingularUnbestimmt
	=
		p:PräsensSingular "ment" {return p.charAt(0).toUpperCase() + p.slice(1) + "ung";}

NominativPluralUnbestimmt
	=
    	"breakfasts" {return "Frühstücke"} /
        "shoes" {return "Schuhe"}
        
Präsens = 
	"is" _ p:PräsensSingular "ing" { return p } /
	p:PräsensSingular "s" { return p }

Futur = 
	"are" _ "going" _ "to" _ p:PräsensPlural { return p } /
	"will" _ "be" _ p:PräsensPlural "ing" { return p }/
	"will" _ p:PräsensPlural { return p }

Objekt
	= 
    	"a" _ v:PräsensSingular "ment" {return "eine " + v.charAt(0).toUpperCase() + v.slice(1) + "ung";} /
    	a:Adjective _ v:PräsensSingular "ments" {return "eine " + a + "e " + v.charAt(0).toUpperCase() + v.slice(1) + "ung";} /
    	a:Adjective _ v:AkkussativPlural {return a + "e " + v;} /
    	_ v:PräsensSingular "ments" {return v.charAt(0).toUpperCase() + v.slice(1) + "ungen";}
      
AkkussativPlural =
    "hydrogens" {return "Wasserstoffe";}


PräsensSingular =
    "begin" {return "beginn";} /
    "make" {return "mach";} /
    "find" {return "find";} /
    "buy" {return "kauf";} /
    "joke" {return "witzel";} /
    "lose" {return "verlier";} /
    "wear" {return "trag";} /
    "say" {return "sag";} /
    "tow" {return "abschlepp";} /
    "mean" {return "bedeut";} /
    "get" {return "bekomm";} /
    "leave" {return "verlass";} /
    "phone" {return "anruf";} /
    "mean" {return "bedeut";} /
    "mourn" {return "trauer";} /
    "paddle" {return "paddel";} /
    "park" {return "park";}

PräsensPlural =
    "find" {return "find";} /
    "thank" {return "dank";} /
    "grab" {return "greif";} /
    "wear" {return "trag";} /
    "say" {return "sag";} /
    "tow" {return "abschlepp";} /
    "mean" {return "bedeut";} /
    "get" {return "bekomm";} /
    "leave" {return "verlass";} /
    "phone" {return "anruf";} /
    "mean" {return "bedeut";} /
    "mourn" {return "trauer";} /
    "paddle" {return "paddel";} /
    "park" {return "park";}

Time
	=
		"before" {return "vor";} /
		"today" {return "heute";} /
		"yesterday" {return "gestern";} /
		"on" {return "auf";} /
		"after" {return "nach";} /
		"at" _ "night" {return "nachts";} /
		"in" _ "the" _ "morning" {return "morgens";}

		
Trigger
	=
		t:Time _ "the" _ n:PräsensPlural "ments" {
			return t + " den " + n.charAt(0).toUpperCase() + n.slice(1) + "ungen";
		}/
		t:Time _ "the" _ n:PräsensPlural "ment" {
			return t + " der " + n + "ung";
		}/
		t:Time _ a:Adjective _ n:DativPlural {
			return t + " " + a + "en " + n;
		}/
		t:Time _ a:Adjective _ "the"_ n:GenitivMasculinumSingularDirektiv {
			return t + " dem " + a + "en " + n;
		}/
		t:Time _ a:Adjective _ "the"_ n:GenitivMasculinumPluralDirektiv {
			return t + " " + a + " " + n;
		}/
		t:Time _ "the" _ n:GenitivMasculinumSingularDirektiv {
			return t + " " + n;
		}/
		t:Time _ n:GenitivMasculinumPluralIndirektiv {
			return t + " " + n;
		} /
    	t:Time {
			return t;
        }
		
		
NominativFemininumSingular
	=
		p:PräsensSingular "ment" {return p.charAt(0).toUpperCase() + p.slice(1) + "ung";} /
		"breakfasts" {return "Frühstücke";} /
		"shoes" {return "Schuhe";} /
		"queens" {return "Königinnen";}
        
NominativFemininumPlural
	=
		"breakfasts" {return "Frühstücke";} /
		"shoes" {return "Schuhe";} /
		"queens" {return "Königinnen";}
        
GenitivMasculinumSingularIndirektiv 
	=
		"months" {return "MOnaten";}

GenitivMasculinumPluralIndirektiv 
	=
		"whales" {return "Walen";}

GenitivMasculinumSingularDirektiv 
	=
		"month" {return "Monat";}/
		"football" {return "des Fußballs";}/
		"students" {return "den Studenten";}/
		"whales" {return "Walen";}
        
GenitivMasculinumPluralDirektiv 
	=
		"football" {return "des Fußballs";}/
		"students" {return "den Studenten";}/
		"whales" {return "Walen";}
        
DativPlural 
	=
		"storys" {return "Geschichten";}/
		"pianos" {return "Pianos";}/
		"whales" {return "Walen";}

Adjective
	=
		a:AdjectiveLiteral {return a;}/
		"un" a:AdjectiveLiteral {return "un" + a;}/
		a:PräsensPlural "ing" {return a.charAt(0) + a.slice(1) + "end";}
		
AdjectiveLiteral
	=
		"easy" {return "leicht";} /
		"best" {return "best";} /
		"white" {return "weiß";} /
		"social" {return "sozial";} /
        "political" {return "politisch";}

_ = [ \t\n\r]* {return ""}


