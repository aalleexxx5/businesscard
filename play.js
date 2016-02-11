var c,x, SS,SQ,t,gl= 0,an,g=true, wh= 0, mp, iC, w=window, bl, tx=-2;
var h = ["Cold facts", "Likes/Dislikes","Traits", "Warm Header", "Hot Header"];
var io = ["Computer science student*Not great at Maths","Enjoys Coding, video games and traveling*Does not like Coffee, Crowded places and Getting up early", "Passionate*Introverted*Optimistic*Does not drink alcohol","stuff here*stuff here too*and here","stuff goes here*stuff goes here as well*don't forget here"];
var bx = [];
var o="rgba(255,255,255,", tr = "transparent";
var CX,CY;
var UF = 20;
var AD = 50;
var IR = 0.25;
var GD=1000;
var f= 0,s=44100;
var M=Math,P= M.PI;
Go();

function Rz() {
    var wh= w.innerHeight, ww= w.innerWidth;
    SS = M.floor(((ww / 2) / 100)) * 100;
    SQ = SS / 5;
    CX = M.floor(ww / 2);
    CY = M.floor(wh / 2);
    c.width = ww;
    c.height = wh;
    x.fillStyle = "#141221";
    x.fillRect(0, 0, ww, wh);
    if (bx[0] != undefined) {
        if (bx[0].s > SQ) {
            for (var i = 0; i < bl; i++) {
                bx[i].s = SQ;
            }
        }
        for (i = 0; i < bl; i++) {
            bx[i].x = CX + (i * SQ * 1.5) - (2 * SQ * 1.5 + SQ / 2);
            bx[i].y = CY - SQ / 2;
        }
    }
}
function Go() {
    c = document.getElementById("canvas");
    x = c.getContext("2d");
    Rz();
    w.addEventListener("Rz", Rz, false);
    x.fillStyle = CG(1);

    x.fillRect(10, 10, SS, SQ);
    an = setInterval(Up, UF);
    w.requestAnimationFrame(Dr);
}

function Box(x,y,s,r){
    this.x=x;
    this.y=y;
    this.s=s;
    this.r=r;
}

function Up() {//updates values once every ~20msec
    bl = bx.length;
    if(!iC){
        iC = iA();
    }else{
        var moe = -1;
        for(var i=0; i<bl; i++) {
            if (mp.x > bx[i].x && mp.x < bx[i].x + bx[i].s && mp.y > bx[i].y && mp.y < bx[i].y + bx[i].s) {//if mouse is on top of a box
                moe = i;
                for (var j = 0; j < i; j++) {//boxes that needs to move left
                    if (bx[i - 1].x + SQ * 1.2 > bx[i].x) {
                        bx[j].x--;
                    }
                }
                for (j = i + 1; j < bl; j++) {//boxes that needs to move right
                    if (bx[i].x + SQ * 1.2 > bx[i + 1].x) {
                        bx[j].x++;
                    }
                }
            }
        }
        for(i=0; i<bl; i++){
            if (moe==-1){
                if(bx[i].x<CX+(-SQ*0.5)+SQ*(i-2)){
                    bx[i].x++;
                }else if(bx[i].x>CX+(-SQ*0.5)+SQ*(i-2)){
                    bx[i].x--;
                }
            }else{
                if(i<moe-1){
                    if(bx[i].x+bx[i].s<bx[i+1].x){
                        bx[i].x++;
                    }
                }else if(i>moe+1){
                    if (bx[i-1].x+bx[i-1].s<bx[i].x){
                        bx[i].x--;
                    }
                }
            }

        }
        if(tx==-2){
            tx=moe;
        }
    }

    f++;
}

function Dr(){ //runes every Frame by browser
    x.fillStyle="#141221";
    x.fillRect(0,0,c.width,c.height);
    if (wh!=0){
        x.fillStyle="rgba(255,255,255,"+wh.toString()+")";
        x.fillRect(0,0,c.width,c.height);
    }
    if(tx!=-2){
        if(tx==-1) {
            Dt("Alex Holberg - Business Card", "");
        }else{
            Dt(h[tx],io[tx]);
        }
    }
    if(gl>0&&gl<=1){
        DGE();
    }
//    x.fillStyle="#ffffff";
//    x.fillText(t.toString(),50,50);
    for(var i=0; i<bl; i++){
        x.save();
        x.translate(bx[i].x+SQ/2,bx[i].y+SQ/2);
        x.rotate(bx[i].r*P);
        x.translate(-SQ/2,-SQ/2);
        x.fillStyle = CGr(i);
        x.fillRect(0,0,bx[i].s,SQ);
        x.restore();
    }
    w.requestAnimationFrame(Dr);
}

function Dt(hr, tx){
    x.save();
    x.translate(bx[0].x, CY-SQ/2);
    x.font="small-caps 56px Arial";
    x.strokeStyle=CGr(0);
    x.strokeText(hr,0,0);
    x.font="24px Arial";
    x.fillStyle=("#545251");
    x.translate(0,SQ);
    while(tx.contains('*')){
        var i = tx.indexOf('*');
        var t=tx.substring(0,i);
        tx=tx.substring(i+1);
        x.translate(0,24);
        x.fillText(t,0,0);
    }
    x.translate(0,24);
    x.fillText(tx,0,0);
    x.restore();
}

function iA(){
    t = M.floor(f / AD);

    //Add bx on screen
    if (bl < 5 && t == bl) {
        bx[t] = CB(t);
    }
    else if (bx[4] == undefined) {
    }
    //expand bx
    else if (bx[0].s < SQ) {
        if (t > 4) {
            for (var i = 0; i < bl; i++) {
                bx[i].s++;
            }
        }
    }
    //rotate bx
    else if (bx[4].r >= 0) {
        for (i = 0; i < bl; i++) {
            if (bx[i].r != 0) {
                bx[i].r -= 0.1 * (IR / 5);
            }
        }
    }
    //Add gl effect
    else if(bx[4].r<=0&&gl<1&&bx[0]&&g){
        gl+=UF/GD;
        if (gl>1){
            gl=1;
        }
    }
    //Move bx
    else if(bx[0].x+bx[0].s<=bx[1].x-1) {
        g=false;
        for (i = 0; i < bl; i++) {
            bx[i].x -= SQ * 0.5 * (i - 2) * UF / (GD*0.1);
        }
        gl-=UF/(GD*0.1);
    }
    //combine bx and stop an
    else if (wh < 0.5&& gl<3){
        gl=2;
        wh+=0.025;
    }
    else if(wh>=0){
        tx=-1;
        wh-=0.025;
        gl=3;
    }else if(mp==undefined){
        PS();
        mp=0;
        c.addEventListener("mousemove",function(evt) {
            mp={x:evt.clientX,y:evt.clientY};
        },false);
        c.addEventListener("click",function(){
            tx=-2;
        },false)
    }else return true;
    return false;
}

function DGE(){
    x.fillStyle=CG(gl);
    for(var i=0; i<bl; i++){
        x.save();
        for(f=0;f<4;f++){
            x.save();
            x.translate(bx[i].x+SQ/2,bx[i].y+SQ/2);
            x.rotate(f*0.5*P);
            x.translate(SQ/2,-SQ/2);
            x.fillRect(0,0,SQ/4,SQ);
            x.translate(0,SQ);
            x.fillStyle=CGC(gl);
            x.fillRect(0,0,SQ/4,SQ/4);
            x.restore();
        }
        x.restore();
    }
}

function CB(num){
    return new Box(CX+(num*SQ*1.5)-(2*SQ*1.5+SQ/2),CY-SQ/2,20,IR);
}

function CG(num){//num is 0-1
    var g = x.createLinearGradient(0,0,SQ/4,0);
    g.addColorStop(0,o+num+")");
    g.addColorStop(1,tr);
    return g;
}

function CGC(num){
    var g = x.createRadialGradient(0,0,0,0,0,SQ/4);
    g.addColorStop(0,o+num+")");
    g.addColorStop(1,tr);
    return g;
}

function CGr(num){
    var g = x.createLinearGradient(-(SQ*num),0,SS-(SQ*num),num);
    function s(q,w){
        g.addColorStop(q,w);
    }
    s(0,"#211E3D");
    s(0.142,"#30327C");
    s(0.34,"#63C9FC");
    s(0.456,"#0BBB56");
    s(0.7,"#F7E920");
    s(1,"#FF3A30");
    return g;
}

function PS(){
    var seattleFrequencies = [349.23, 466.16, 587.33, 523.33, 466.16, 392, 466.16 , 587.33, 523.25, 466.16, 349.23, 392, 466.16, 523.25, 466.16, 523.25 ,587.33, 466.16];
    var seattleTimings = [0.375,0.375,0.25,0.50,0.50,0.375,0.375,0.25,0.50,0.50,1.25,0.25,0.25,1.00,0.25,0.125,0.4,0.5];
    var arpFreqs = [466.16,698.46,466.16,466.16,698.46,932.33,466.16,880,932.33,698.46,880,587.33,698.46,698.46,587.33];
    var bassFreqs =   [116.54,   0,  98,  0,77.78,  0,58.27,   0,87.31,  0,77.78,  0];
    var bassTimings = [1.3,0.71,0.8,0.21,0.8,0.21,1.3,0.71,0.8,0.21,0.71,0.21];
    var kickTimings = [0.42,0.42,0.86,0.28,1.02,1];
    var arpTempo = 0.133;
    var al=arpFreqs.length;
    var samples = []; //new Float32Array(samples_length);
    var samples1 =[];
    var samplesB =[];
    var kicks=[];
    var claps = [];
    var openingBeats=[];
    var test=[];

    var samples_length;               // Plays for 1 second (44.1 KHz)
    for(var f=0; f<seattleFrequencies.length; f++){
        samples_length=s*seattleTimings[f];
        for (var i=0; i < samples_length ; i++) { // fills array with samples
            var sl = samples.length;
            var t = i/samples_length;               // time from 0 to 1
            samples[sl] =0.1 * M.sin( seattleFrequencies[f] * 2*P*(i/s)); // wave equation (between -1,+1)
            samples[sl] *= ((1-(t)));                    // "fade" effect (from 1 to 0)
        }
    }
    for(f=0; f<bassFreqs.length; f++){
        samples_length=s*bassTimings[f];
        for (i=0; i < samples_length ; i++) { // fills array with samples
            var sb = samplesB.length;
            t = i/samples_length;               // time from 0 to 1
            samplesB[sb] = M.abs(M.sin( bassFreqs[f] * 2*P*(i/s))+M.sin( (bassFreqs[f]*2) * 2*P*(i/s)))/2; // wave equation (between -1,+1)
            samplesB[sb] *= (0.08);
            if(t>0.95) {
                samplesB[sb] *= 1-(t-0.95)*20;
            }
        }
    }


    for(f=0; f<al; f++){
        samples_length=s*arpTempo;
        for (i=0; i < samples_length ; i++) { // fills array with samples
            var s1=samples1.length;
            t = i/samples_length;               // time from 0 to 1
            samples1[s1] = .06*M.sin( arpFreqs[f] * 2*P*(i/s)); // wave equation (between -1,+1)
            samples1[s1] *= (1-t);                    // "fade" effect (from 1 to 0)
        }
    }

    for(f=0; f<kickTimings.length; f++){
        samples_length=s*kickTimings[f];
        for (i=0; i < samples_length ; i++) { // fills array with samples
            var kl=kicks.length;
            if(i<s/4) {
                kicks[kl] = M.pow(2.8, -(i / 3000)) * M.sin((58.27 / 2) * 2 * P * (i / s)); // wave equation (between -1,+1)
            }else{
                kicks[kl]=0
            }
        }
    }
    samples_length=44100*2;
    for (i=0; i < samples_length ; i++) { // fills array with samples
        var cl = claps.length;
        claps[cl] =0.04* M.pow(2.8,-(i / 1500))*(M.random()*2); // wave equation (between -1,+1)
    }
    samples_length=s*10;
    for (i=0; i < samples_length ; i++) { // fills array with samples
        f=(M.pow(2.72,i/s)+50);
        var longnum=100000
        test[test.length] =0.4*(M.sin( f * 2*P*(i/s))+2*((i/(longnum/f))-M.floor(0.5+(i/(longnum/f))))/2); // wave equation (between -1,+1)
    }//(M.sin( f * 2*P*(i/44100))+

    /*
     for (i=0; i < 44100*(arpTempo*arpFreqs.length+arpTempo*3) ; i++) { // fills array with samples
     openingBeats[i]=0;
     }
     for(f=0; f<6; f++){
     samples_length=44100*0.13;
     for (i=0; i < samples_length ; i++) { // fills array with samples
     if(i<12000) {
     openingBeats[openingBeats.length] = M.pow(2.8, -(i / 3000)) * M.sin((58.27 / 2) * 2 * P * (i / 44100)); // wave equation (between -1,+1)
     }else{
     openingBeats[openingBeats.length]=0
     }
     }
     }*/


    for(i=0;i<sl;i++){//++kicks[i%kicks.length]
        samples[i] = ((samples[i]+samplesB[i]+kicks[i%kl]+claps[i%cl]+samples1[i%samples1.length])/1.5);
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

    var wave = new RW();
    var audio = new Audio();
    var audio2 = new Audio();
    audio.loop=true;
    audio2.loop=true;
    var samples2=c16(samples);
    var samples3=c16(samples1);
    wave.Mk(samples2);
    audio.src=wave.URI;
    wave.Mk(samples3);
    audio2.src=wave.URI;
    setTimeout(function() { audio.play(); }, (arpTempo*1000*al)*2); // page needs time to load?
    setTimeout(function() { audio2.play(); }, 10); // page needs time to load?
    setTimeout(function() { audio2.loop=false; }, (arpTempo*1000*al+200)); // page needs time to load?



    function c16(data) {
        var data_0_32767=[];
        for (var i=0;i<data.length;i++) {
            data_0_32767[i]=M.round(32767*data[i]);
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

var RW = function(da) {

    this.data = [];        // Array containing audio samples
    this.wav = [];         // Array containing the generated wave file
    this.URI = '';     // http://en.wikipedia.org/wiki/Data_URI_scheme

    this.H = {                         // OFFS SIZE NOTES
        CI      : [0x52,0x49,0x46,0x46], // 0    4    "RIFF" = 0x52494646
        CS    : 0,                     // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
        f       : [0x57,0x41,0x56,0x45], // 8    4    "WAVE" = 0x57415645
        sc  : [0x66,0x6d,0x74,0x20], // 12   4    "fmt " = 0x666d7420
        ss: 16,                    // 16   4    16 for PCM
        af  : 1,                     // 20   2    PCM = 1
        ch  : 1,                     // 22   2    Mono = 1, Stereo = 2...
        sr   : s,                  // 24   4    8000, 44100...
        br     : 0,                     // 28   4    SampleRate*NumChannels*BitsPerSample/8
        ba   : 0,                     // 32   2    NumChannels*BitsPerSample/8
        b: 16,                     // 34   2    8 bits = 8, 16 bits = 16
        sc2  : [0x64,0x61,0x74,0x61], // 36   4    "data" = 0x64617461
        ss2: 0                      // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
    };

    function U32(i) {
        return [i&0xFF, (i>>8)&0xFF, (i>>16)&0xFF, (i>>24)&0xFF];
    }

    function u16(i) {
        return [i&0xFF, (i>>8)&0xFF];
    }

    function s16(data) {
        var r = [];
        var j = 0;
        var len = data.length;
        for (var i=0; i<len; i++) {
            r[j++] = data[i] & 0xFF;
            r[j++] = (data[i]>>8) & 0xFF;
        }
        return r;
    }

    this.Mk = function(k) {
        if (k instanceof Array) this.data = k;
        this.H.ba = (this.H.ch * this.H.b) >> 3;
        this.H.br = this.H.ba * this.sr;
        this.H.ss2 = this.data.length * (this.H.b >> 3);
        this.H.CS = 36 + this.H.ss2;

        this.wav = this.H.CI.concat(
            U32(this.H.CS),
            this.H.f,
            this.H.sc,
            U32(this.H.ss),
            u16(this.H.af),
            u16(this.H.ch),
            U32(this.H.sr),
            U32(this.H.br),
            u16(this.H.ba),
            u16(this.H.b),
            this.H.sc2,
            U32(this.H.ss2),
            (this.H.b == 16) ? s16(this.data) : this.data
        );
        this.URI = 'data:audio/wav;base64,'+FastBase64.Encode(this.wav);
    };

    if (da instanceof Array) this.Mk(da);

}; // end RW