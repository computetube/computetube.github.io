let fs = require('fs');

fs.readFile("./grammar2.pegjs",'utf8', function (err,data) {
	  if (err) {
		return console.log(err);
	  }
	let peg = require("pegjs");

	var parser = peg.generate(data);


	let { Tarot } = require("./TarotLib.js");

	let t = new Tarot("" + Date.now());

	for(let i = 0;i < 50;++i) {
		let s = t.get().trim() + ".";
		console.log(s);
		let s2 = parser.parse(s);
		console.log(s2);
	}

});


