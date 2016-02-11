/*
 * RIFFWAVE.js v0.03 - Audio encoder for HTML5 <audio> elements.
 * Copyleft 2011 by Pedro Ladaria <pedro.ladaria at Gmail dot com>
 *
 * Public Domain
 *
 * Changelog:
 *
 * 0.01 - First release
 * 0.02 - New faster base64 encoding
 * 0.03 - Support for 16bit samples
 *
 * Notes:
 *
 * 8 bit data is unsigned: 0..255
 * 16 bit data is signed: −32,768..32,767
 *
 */

function playSeattle(){
    var seattleFrequencies = [349.23, 466.16, 587.33, 523.33, 466.16, 392, 466.16 , 587.33, 523.25, 466.16, 349.23, 392, 466.16, 523.25, 466.16, 523.25 ,587.33, 466.16];
    var seattleTimings = [0.375,0.375,0.25,0.50,0.50,0.375,0.375,0.25,0.50,0.50,1.25,0.25,0.25,1.00,0.25,0.125,0.4,0.5];
    var arpFreqs = [466.16,698.46,466.16,466.16,698.46,932.33,466.16,880,932.33,698.46,880,587.33,698.46,698.46,587.33];
    var bassFreqs =   [116.54,   0,  98,  0,77.78,  0,58.27,   0,87.31,  0,77.78,  0];
    var bassTimings = [1.3,0.71,0.8,0.21,0.8,0.21,1.3,0.71,0.8,0.21,0.71,0.21];
    var kickTimings = [0.38,0.36,0.96,0.28,1.02,1];
    var arpTempo = 0.133;
    var samples = []; //new Float32Array(samples_length);
    var samples1 =[];
    var samplesB =[];
    var kicks=[];
    var claps = [];
    var openingBeats=[];
    var test=[];

    var samples_length;               // Plays for 1 second (44.1 KHz)
    for(var f=0; f<seattleFrequencies.length; f++){
        samples_length=44100*seattleTimings[f];
        for (var i=0; i < samples_length ; i++) { // fills array with samples
            var t = i/samples_length;               // time from 0 to 1
            samples[samples.length] =0.08 * Math.sin( seattleFrequencies[f] * 2*Math.PI*(i/44100)); // wave equation (between -1,+1)
            samples[samples.length-1] *= ((1-(t)));                    // "fade" effect (from 1 to 0)
        }
    }
    for(f=0; f<bassFreqs.length; f++){
        samples_length=44100*bassTimings[f];
        for (i=0; i < samples_length ; i++) { // fills array with samples
            t = i/samples_length;               // time from 0 to 1
            samplesB[samplesB.length] = Math.abs(Math.sin( bassFreqs[f] * 2*Math.PI*(i/44100))+Math.sin( (bassFreqs[f]*2) * 2*Math.PI*(i/44100)))/2; // wave equation (between -1,+1)
            samplesB[samplesB.length-1] *= (0.06);
            samplesB[samplesB.length-1] *= (1-t);                    // "fade" effect (from 1 to 0)
        }
    }


    for(f=0; f<arpFreqs.length; f++){
        samples_length=44100*arpTempo;
        for (i=0; i < samples_length ; i++) { // fills array with samples
            t = i/samples_length;               // time from 0 to 1
            samples1[samples1.length] = .04*Math.sin( arpFreqs[f] * 2*Math.PI*(i/44100)); // wave equation (between -1,+1)
            samples1[samples1.length-1] *= (1-t);                    // "fade" effect (from 1 to 0)
        }
    }

    for(f=0; f<kickTimings.length; f++){
        samples_length=44100*kickTimings[f];
        for (i=0; i < samples_length ; i++) { // fills array with samples
            if(i<12000) {
                kicks[kicks.length] = Math.pow(2.8, -(i / 3000)) * Math.sin((58.27 / 2) * 2 * Math.PI * (i / 44100)); // wave equation (between -1,+1)
            }else{
                kicks[kicks.length]=0
            }
        }
    }
    samples_length=44100*2;
    for (i=0; i < samples_length ; i++) { // fills array with samples
        claps[claps.length] =0.02* Math.pow(2.8,-(i / 1500))*(Math.random()*2); // wave equation (between -1,+1)
    }
    samples_length=44100*10;
    for (i=0; i < samples_length ; i++) { // fills array with samples
        f=(Math.pow(2.72,i/44100)+50);
        test[test.length] =0.2*(Math.sin( f * 2*Math.PI*(i/44100))+2*((i/(100000/f))-Math.floor(0.5+(i/(100000/f))))/2); // wave equation (between -1,+1)
    }//(Math.sin( f * 2*Math.PI*(i/44100))+

    /*
    for (i=0; i < 44100*(arpTempo*arpFreqs.length+arpTempo*3) ; i++) { // fills array with samples
        openingBeats[i]=0;
    }
        for(f=0; f<6; f++){
        samples_length=44100*0.13;
        for (i=0; i < samples_length ; i++) { // fills array with samples
            if(i<12000) {
                openingBeats[openingBeats.length] = Math.pow(2.8, -(i / 3000)) * Math.sin((58.27 / 2) * 2 * Math.PI * (i / 44100)); // wave equation (between -1,+1)
            }else{
                openingBeats[openingBeats.length]=0
            }
        }
    }*/


    for(i=0;i<samples.length;i++){//++kicks[i%kicks.length]
        samples[i] = ((samples[i]+samplesB[i]+kicks[i%kicks.length]+claps[i%claps.length]+samples1[i%samples1.length])/1.5);
    }
/*
    f=samples1.length;
    for(i=0;i<openingBeats.length;i++){
        samples1[i]=samples1[i%f]+openingBeats[i]/2;
    }*/
/*
    var temp = [];
    for(i=0;i<samples.length-6000;i++){
        temp[i] = samples[i];
    }*/
    /*
    for(i=samples.length-6838;i<samples.length;i++){
        samples[i]=;
    }*/

    var wave = new RIFFWAVE();
    var audio = new Audio();
    var audio2 = new Audio();
    var audio3 = new Audio();
    audio.loop=true;
    audio2.loop=true;
    //audio3.loop=true;
    var samples2=convert16bit(samples);
    var samples3=convert16bit(samples1);
    var samples4=convert16bit(test);
    wave.Mk(samples2);
    audio.src=wave.URI;
    wave.Mk(samples3);
    audio2.src=wave.URI;
    wave.Mk(samples4);
    audio3.src=wave.URI;
//    setTimeout(function() { audio3.play(); }, 10);
    setTimeout(function() { audio.play(); }, (arpTempo*1000*arpFreqs.length)*2); // page needs time to load?
    setTimeout(function() { audio2.play(); }, 10); // page needs time to load?
    setTimeout(function() { audio2.loop=false; }, (arpTempo*1000*arpFreqs.length+200)); // page needs time to load?



    function convert16bit(data) {
        var data_0_32767=[];
        for (var i=0;i<data.length;i++) {
            data_0_32767[i]=Math.round(32767*data[i]);
        }
        return data_0_32767;
    }
}

var FastBase64 = {

    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    eL: [],

    Init: function() {
        for (var i=0; i<4096; i++) {
            this.eL[i] = this.chars[i >> 6] + this.chars[i & 0x3F];
        }
    },

    Encode: function(src) {
        var len = src.length;
        var dst = '';
        var i = 0;
        while (len > 2) {
            n = (src[i] << 16) | (src[i+1]<<8) | src[i+2];
            dst+= this.eL[n >> 12] + this.eL[n & 0xFFF];
            len-= 3;
            i+= 3;
        }
        if (len > 0) {
            var n1= (src[i] & 0xFC) >> 2;
            var n2= (src[i] & 0x03) << 4;
            if (len > 1) n2 |= (src[++i] & 0xF0) >> 4;
            dst+= this.chars[n1];
            dst+= this.chars[n2];
            if (len == 2) {
                var n3= (src[i++] & 0x0F) << 2;
                n3 |= (src[i] & 0xC0) >> 6;
                dst+= this.chars[n3];
            }
            if (len == 1) dst+= '=';
            dst+= '=';
        }
        return dst;
    } // end Encode

};

FastBase64.Init();

var RIFFWAVE = function(data) {

    this.data = [];        // Array containing audio samples
    this.wav = [];         // Array containing the generated wave file
    this.URI = '';     // http://en.wikipedia.org/wiki/Data_URI_scheme

    this.H = {                         // OFFS SIZE NOTES
        chunkId      : [0x52,0x49,0x46,0x46], // 0    4    "RIFF" = 0x52494646
        chunkSize    : 0,                     // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
        format       : [0x57,0x41,0x56,0x45], // 8    4    "WAVE" = 0x57415645
        subChunk1Id  : [0x66,0x6d,0x74,0x20], // 12   4    "fmt " = 0x666d7420
        subChunk1Size: 16,                    // 16   4    16 for PCM
        audioFormat  : 1,                     // 20   2    PCM = 1
        numChannels  : 1,                     // 22   2    Mono = 1, Stereo = 2...
        sampleRate   : 44100,                  // 24   4    8000, 44100...
        byteRate     : 0,                     // 28   4    SampleRate*NumChannels*BitsPerSample/8
        blockAlign   : 0,                     // 32   2    NumChannels*BitsPerSample/8
        bitsPerSample: 16,                     // 34   2    8 bits = 8, 16 bits = 16
        subChunk2Id  : [0x64,0x61,0x74,0x61], // 36   4    "data" = 0x64617461
        subChunk2Size: 0                      // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
    };

    function u32ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF, (i>>16)&0xFF, (i>>24)&0xFF];
    }

    function u16ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF];
    }

    function split16bitArray(data) {
        var r = [];
        var j = 0;
        var len = data.length;
        for (var i=0; i<len; i++) {
            r[j++] = data[i] & 0xFF;
            r[j++] = (data[i]>>8) & 0xFF;
        }
        return r;
    }

    this.Mk = function(data) {
        if (data instanceof Array) this.data = data;
        this.H.ba = (this.H.ch * this.H.b) >> 3;
        this.H.br = this.H.ba * this.sr;
        this.H.ss2 = this.data.length * (this.H.b >> 3);
        this.H.CS = 36 + this.H.ss2;

        this.wav = this.H.CI.concat(
            u32ToArray(this.H.CS),
            this.H.f,
            this.H.sc,
            u32ToArray(this.H.ss),
            u16ToArray(this.H.af),
            u16ToArray(this.H.ch),
            u32ToArray(this.H.sr),
            u32ToArray(this.H.br),
            u16ToArray(this.H.ba),
            u16ToArray(this.H.b),
            this.H.sc2,
            u32ToArray(this.H.ss2),
            (this.H.b == 16) ? split16bitArray(this.data) : this.data
        );
        this.URI = 'data:audio/wav;base64,'+FastBase64.Encode(this.wav);
    };

    if (data instanceof Array) this.Mk(data);

}; // end RW
playSeattle();
