
	let AudioContext = require("web-audio-api").AudioContext;
	let {GPU} = require("gpu.js");
let {blur,shuffle,instrumentsF,Instrument,rand,GeneralRandom} = require("./MyLib.js");

	let drums = [];

    const gpu = new GPU();

    var audioCtx = new AudioContext();

    const add = gpu.createKernel(function (buffer,wave,offset,fr,channel,vol) {
        return buffer[this.thread.x + offset] + 0.75 * vol * wave[Math.trunc(this.thread.x / 2.0 * 4.0 * fr + channel)] / 100000;
    }).setOutput([22000]);
    gpu.addFunction(function mypow(x,y) {
    	return Math.pow(Math.abs(x),y) * (x < 0 ? -1 : 1);
    });
    const add2 = gpu.createKernel(function (a,b,c,d,e,f,g) {
    	let x = 441.0 * Math.PI * this.thread.x / 44100.0 * 2 * Math.PI * Math.pow(2.0,Math.trunc(-38 + 3 * e)  / 12.0);    		
		return Math.atan(
				mypow(Math.sin(x),5 * a + 0.1) * 
				(mypow(Math.cos(this.thread.x / 100.0 * (1.5 * c + 0.5)),1.5 * b + 0.5) + 1)
			) * 
			(Math.atan(-0.006 * (4 * f + 1) * (x - 10 - 10 * g)) + Math.PI / 2);
        //return buffer[this.thread.x + offset] + vol * Math.atan(1.5 * y)  / 5;
    }).setOutput([200000]);

    class Drum0 {
        constructor(instrument,q,d) {
            this.instrument = instrument;
            this.index = 0;
            this.q = q;
            this.d = d;
            this.tone = -Math.trunc(4 * Math.random());
        }
        
        play(buffer,offset,tone,sampleRate) {
            if(this.index % this.q == this.d) {
                this.instrument.render(buffer,offset,this.tone,sampleRate,1.25,100);
            }
            this.index += 1;
        }
    }

    class Drum {
        constructor(instrument) {
            this.instrument = instrument;
            this.tone = -Math.trunc(4 * Math.random());
        }
        
        play(buffer,offset,tone,sampleRate) {
            if(Math.random() < 0.2) {
                this.instrument.render(buffer,offset,this.tone,sampleRate,0.99,100);
            }
        }
    }
    
     
        var channels = 2;
        var seconds = 60;
        var frameCount = audioCtx.sampleRate * seconds;
         let bl = blur.setOutput([frameCount]);


    function sound() {
        var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

        var drums0 = shuffle(instrumentsF(add2));
        
        let ds = [];
        let takt = 6;
        let xs = [];
        
        for(let i = 0;i < 3;++i) {
            let m;
            do {
                m = rand(takt);
            } while(xs.includes(m));
            xs.push(m);
            ds.push(new Drum0(new Instrument(drums0.shift(),add),takt,m));
          /*ds.push(new Drum0(new Instrument([[1,2,3],[1,2,3],[1,2,3]],function(buffer,wave,offset,fr,channel,vol) {
             	return add2(a,b,c,d,buffer,wave,offset,fr,channel,vol);
             }),takt,m));*/
        }
        for(let i = 0;i < 3;++i) {
            ds.push(new Drum(new Instrument(drums0.shift(),add)));
        }
        
        let n = rand(2) + 1;

        for(let i = 0;i < frameCount;i += Math.round(audioCtx.sampleRate * n * 0.125)) {
            ds.forEach((d) => {
                d.play(myArrayBuffer,i,0,audioCtx.sampleRate);
            });
        }
        
        for(let i = 0;i < channels;++i) {
		let ad = myArrayBuffer.getChannelData(i);
		let xs = blur(new Float32Array(ad));
	    console.log(xs);
	    console.log("---------------------------------");
	    console.log(ad);
		for(let j = 0;j < ad.length;+j) ad[j] = xs[j];
	}
        
       // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        var source = audioCtx.createBufferSource();
        source.onended = sound;
        // set the buffer in the AudioBufferSourceNode
        source.buffer = myArrayBuffer;
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioCtx.destination);
        // start the source playing
        source.start();
    }
    
    sound();

