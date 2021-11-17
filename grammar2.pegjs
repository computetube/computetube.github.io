{
	function sc(s) {
    	s = s.trim();
    	s = s.charAt(0).toUpperCase() + s.slice(1);
        return s.replace("\\s+"," ");
    }
}


Sentence
 	= ( _ trigger:(_ t:Trigger _ ","? _ {return t})* _ article0:("the" / "a")? _  adjective:(Adjective)? _ article1:("the" / "a")? _ "." _
    )+


_ = [ \t\n\r]* {return ""}

Time
	=
		"tomorrow" {return "morgen";} /
		"before" {return "vor";} /
		"today" {return "heute";} /
		"yesterday" {return "gestern";} /
		"on" {return "auf";} /
		"after" {return "nach";} /
		"at" _ "night" {return "nachts";} /
		"in" _ "the" _ "morning" {return "morgens";}

		
Trigger
	=
		t:Time _ ("a" / "the")? _ adjective:(Adjective)? _ n:Präsens "ment" "s"? {
			return "";
		}


PräsensSingular = 
	"is" _ p:PräsensLiteral "ing" { return p } /
	p:PräsensLiteral "s" { return p }


PräsensLiteral =
    "zoom" {return "vergrößer";} / 
    "begin" {return "beginn";} 

Adjective
	=
		a:AdjectiveLiteral {return a;}/
		"un" a:AdjectiveLiteral {return "un" + a;}/
		a:Präsens "ing" {return a.charAt(0) + a.slice(1) + "end";}
		
AdjectiveLiteral
	=
		"easy" {return "leicht";} /
		"young" {return "jung";} 

DativPlural 
	=
		"storys" {return "Geschichten";}
		
			
NominativFemininumSingular
	=
		p:Präsens "ment" {return p.charAt(0).toUpperCase() + p.slice(1) + "ung";} /
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
	
		
		
		
		
		
		


