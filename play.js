var c,ctx, SIZE_OF_SPECTRUM,SIZE_OF_SQUARE,tock,glow= 0,animation,shouldGlow=true, whiteshift= 0, mousePos, introComplete, w=window, bl, tx=-2,width,height,d=document;
var headers = ["Cold facts","Skills", "Likes/Dislikes","Traits", "Habits"];
var personalInfo = ["Sex: Male*Nationality: Danish*Born in: September 1996*Current Occupation: Student*Contact at: alexx4387@gmail.com","Abilities span a variety of programming languages*Lacking in Maths skills*Good at puzzles","Enjoys: Programming, Video games, Coloured lights and Owl City*Does not like: Coffee, Crowded places and Getting up early", "Passionate*Introverted*Optimistic","Consumes energy drinks when programming*Gets very passionate about a single project*Enjoys a good story, book film or game*Does not drink alcohol"];
var boxes = [];
var alphalessWhite="rgba(255,255,255,", tr = "transparent",bg="#141221";
var CENTER_X,CENTER_Y;
var UPDATE_FREQUENCY = 20;
var ANIMATION_DURATION = 50;
var INITIAL_ROTATION = 0.25;
var GLOW_DURATION=1000;
var f= 0,s=44100;
var M=Math,P= M.PI;

function Resize() {
    height= w.innerHeight;
    width= w.innerWidth;
    SIZE_OF_SPECTRUM = M.floor(((width / 2) / 100)) * 100;
    SIZE_OF_SQUARE = SIZE_OF_SPECTRUM / 5;
    CENTER_X = M.floor(width / 2);
    CENTER_Y = M.floor(height / 2);
    c.width = width;
    c.height = height;
    Style(bg);
    Rect(0, 0, width, height);
    if (boxes[0] != undefined) {
        if (boxes[0].s > SIZE_OF_SQUARE || (boxes.s!=SIZE_OF_SQUARE && introComplete)) {
            for (var i = 0; i < bl; i++) {
                boxes[i].s = SIZE_OF_SQUARE;
                boxes[i].x = CENTER_X + (i * SIZE_OF_SQUARE) - (2 * SIZE_OF_SQUARE + SIZE_OF_SQUARE / 2);
                boxes[i].y = CENTER_Y - SIZE_OF_SQUARE / 2;
            }
        } else {
            for (i = 0; i < bl; i++) {
                boxes[i].x = CENTER_X + (i * SIZE_OF_SQUARE*1.5) - (2 * SIZE_OF_SQUARE * 1.5 + SIZE_OF_SQUARE / 2);
                boxes[i].y = CENTER_Y - SIZE_OF_SQUARE / 2;
            }
        }
    }
}
function Go() {
    c = d.getElementById("canvas");
    ctx = c.getContext("2d");
    Resize();
    w.addEventListener("resize", Resize, false);
    Style(CreateGlow(1));

    Rect(10, 10, SIZE_OF_SPECTRUM, SIZE_OF_SQUARE);
    animation = setInterval(Update, UPDATE_FREQUENCY);
    Draw();
}

function Box(x,y,s,r){
    this.x=x;
    this.y=y;
    this.s=s;
    this.r=r;
}

function Update() {//updates values once every ~20msec
    bl = boxes.length;
    if(!introComplete){
        introComplete = InitAnimation();
    }else{
        var moe = -1;
        for(var i=0; i<bl; i++) {
            if (mousePos.x > boxes[i].x && mousePos.x < boxes[i].x + boxes[i].s && mousePos.y > boxes[i].y && mousePos.y < boxes[i].y + boxes[i].s) {//if mouse is on top of a box
                moe = i;
                for (var j = 0; j < i; j++) {//boxes that needs to move left
                    if (boxes[i - 1].x + SIZE_OF_SQUARE * 1.2 > boxes[i].x) {
                        boxes[j].x--;
                    }
                }
                for (j = i + 1; j < bl; j++) {//boxes that needs to move right
                    if (boxes[i].x + SIZE_OF_SQUARE * 1.2 > boxes[i + 1].x) {
                        boxes[j].x++;
                    }
                }
            }
        }
        for(i=0; i<bl; i++){
            if (moe==-1){
                if(boxes[i].x<CENTER_X+(-SIZE_OF_SQUARE*0.5)+SIZE_OF_SQUARE*(i-2)){
                    boxes[i].x++;
                }else if(boxes[i].x>CENTER_X+(-SIZE_OF_SQUARE*0.5)+SIZE_OF_SQUARE*(i-2)){
                    boxes[i].x--;
                }
            }else{
                if(i<moe-1){
                    if(boxes[i].x+boxes[i].s<boxes[i+1].x){
                        boxes[i].x++;
                    }
                }else if(i>moe+1){
                    if (boxes[i-1].x+boxes[i-1].s<boxes[i].x){
                        boxes[i].x--;
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

function Draw(){ //runes every Frame by browser
    Style(bg);
    Rect(0,0,width,height);
    if (whiteshift!=0){
        Style(alphalessWhite+whiteshift+")");
        Rect(0,0,width,height);
    }
    if(tx!=-2){
        if(tx==-1) {
            DrawText("Alex Holberg - Business Card", "");
        }else{
            DrawText(headers[tx],personalInfo[tx]);
        }
    }
    if(glow>0&&glow<=1){
        DGE();
    }
//    ctx.fillStyle="#ffffff";
//    ctx.fillText(tock.toString(),50,50);
    for(var i=0; i<bl; i++){
        ctx.save();
        Trans(boxes[i].x+SIZE_OF_SQUARE/2,boxes[i].y+SIZE_OF_SQUARE/2);
        ctx.rotate(boxes[i].r*P);
        Trans(-SIZE_OF_SQUARE/2,-SIZE_OF_SQUARE/2);
        Style(CreateGradient(i));
        Rect(0,0,boxes[i].s,SIZE_OF_SQUARE);
        ctx.restore();
    }
    w.requestAnimationFrame(Draw);
}

function DrawText(hr, tx){
    ctx.save();
    Trans(boxes[0].x, CENTER_Y-SIZE_OF_SQUARE/2);
    ctx.font="small-caps "+SIZE_OF_SQUARE/3+"px Arial";
    ctx.strokeStyle=CreateGradient(0);
    ctx.strokeText(hr,0,0);
    ctx.font=+SIZE_OF_SQUARE/8+"px Arial";
    Style("#545251");
    Trans(0,SIZE_OF_SQUARE);
    while(tx.contains('*')){
        var i = tx.indexOf('*');
        var t=tx.substring(0,i);
        tx=tx.substring(i+1);
        Trans(0,SIZE_OF_SQUARE/8);
        ctx.fillText(t,0,0);
    }
    Trans(0,SIZE_OF_SQUARE/8);
    ctx.fillText(tx,0,0);
    ctx.restore();
}

function Trans(a, b){
    ctx.translate(a,b);
}
function Rect(a, b, c, d){
    ctx.fillRect(a,b,c,d);
}
function Style(a){
    ctx.fillStyle=a;
}

function InitAnimation(){
    tock = M.floor(f / ANIMATION_DURATION);

    //Add boxes on screen
    if (bl < 5 && tock == bl) {
        boxes[tock] = CreateBox(tock);
    }
    else if (boxes[4] == undefined) {
    }
    //expand boxes
    else if (boxes[0].s < SIZE_OF_SQUARE) {
        if (tock > 4) {
            for (var i = 0; i < bl; i++) {
                boxes[i].s++;
            }
        }
    }
    //rotate boxes
    else if (boxes[4].r >= 0) {
        for (i = 0; i < bl; i++) {
            if (boxes[i].r != 0) {
                boxes[i].r -= 0.1 * (INITIAL_ROTATION / 5);
            }
        }
    }
    //Add glow effect
    else if(boxes[4].r<=0&&glow<1&&boxes[0]&&shouldGlow){
        glow+=UPDATE_FREQUENCY/GLOW_DURATION;
        if (glow>1){
            glow=1;
        }
    }
    //Move boxes
    else if(boxes[0].x+boxes[0].s<=boxes[1].x-1) {
        shouldGlow=false;
        for (i = 0; i < bl; i++) {
            boxes[i].x -= SIZE_OF_SQUARE * 0.5 * (i - 2) * UPDATE_FREQUENCY / (GLOW_DURATION*0.1);
        }
        glow-=UPDATE_FREQUENCY/(GLOW_DURATION*0.1);
    }
    //combine boxes and stop animation
    else if (whiteshift < 0.5&& glow<3){
        glow=2;
        whiteshift+=0.025;
    }
    else if(whiteshift>=0){
        tx=-1;
        whiteshift-=0.025;
        glow=3;
    }else if(mousePos==undefined){
        PlaySound();
        mousePos=0;
        c.addEventListener("mousemove",function(evt) {
            mousePos={x:evt.clientX,y:evt.clientY};
        },false);
        c.addEventListener("click",function(){
            tx=-2;
        },false)
    }else return true;
    return false;
}

function DGE(){
    Style(CreateGlow(glow));
    for(var i=0; i<bl; i++){
        ctx.save();
        for(f=0;f<4;f++){
            ctx.save();
            Trans(boxes[i].x+SIZE_OF_SQUARE/2,boxes[i].y+SIZE_OF_SQUARE/2);
            ctx.rotate(f*0.5*P);
            Trans(SIZE_OF_SQUARE/2,-SIZE_OF_SQUARE/2);
            Rect(0,0,SIZE_OF_SQUARE/4,SIZE_OF_SQUARE);
            Trans(0,SIZE_OF_SQUARE);
            Style(CreateCircleGradiant(glow));
            Rect(0,0,SIZE_OF_SQUARE/4,SIZE_OF_SQUARE/4);
            ctx.restore();
        }
        ctx.restore();
    }
}

function CreateBox(num){
    return new Box(CENTER_X+(num*SIZE_OF_SQUARE*1.5)-(2*SIZE_OF_SQUARE*1.5+SIZE_OF_SQUARE/2),CENTER_Y-SIZE_OF_SQUARE/2,20,INITIAL_ROTATION);
}

function CreateGlow(num){//num is 0-1
    var g = ctx.createLinearGradient(0,0,SIZE_OF_SQUARE/4,0);
    addStop(g,0,alphalessWhite+num+")");
    addStop(g,1,tr);
    return g;
}

function CreateCircleGradiant(num){
    var g = ctx.createRadialGradient(0,0,0,0,0,SIZE_OF_SQUARE/4);
    addStop(g,0,alphalessWhite+num+")");
    addStop(g,1,tr);
    return g;
}
function addStop(g, q, w){
    g.addColorStop(q,w);
}
function CreateGradient(num){
    var g = ctx.createLinearGradient(-(SIZE_OF_SQUARE*num),0,SIZE_OF_SPECTRUM-(SIZE_OF_SQUARE*num),num);
    addStop(g,0,"#211E3D");
    addStop(g,0.142,"#30327C");
    addStop(g,0.34,"#63C9FC");
    addStop(g,0.456,"#0BBB56");
    addStop(g,0.7,"#F7E920");
    addStop(g,1,"#FF3A30");
    return g;
}

function PlaySound(){
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
//    var openingBeats=[];
    var test=[];

    var samples_length;               // Plays for 1 second (44.1 KHz)
    for(var f=0; f<seattleFrequencies.length; f++){
        samples_length=s*seattleTimings[f];
        for (var i=0; i < samples_length ; i++) { // fills array with samples
            var sl = samples.length;
            var t = i/samples_length;               // time from 0 to 1
            samples[sl] =.3*M.sin( seattleFrequencies[f] * 2*P*(i/s)); // wave equation (between -1,+1)
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
                kicks[kl] = M.pow(2.8, -(i / 2500)) * M.sin((58.27 / 2) * 2 * P * (i / s)); // wave equation (between -1,+1)
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
        var longnum=100000;
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

    var audio = d.createElement("AUDIO");
    var audio2 = d.createElement("AUDIO");
    audio.loop=true;
    audio2.loop=true;
    var samples2=c16(samples);
    var samples3=c16(samples1);
    audio.src=RiffWawe(samples2);
    audio2.src=RiffWawe(samples3);
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

function FastBase64(src) {

    var chars= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var eL= [];

        for (var i=0; i<4096; i++) {
            eL[i] = chars[i >> 6] + chars[i & 0x3F];
        }

    /**
     * @return {string}
     */
    function Encode(src) {
        var len = src.length;
        var dst = '',n;
        var i = 0;
        while (len > 2) {
            n = (src[i] << 16) | (src[i+1]<<8) | src[i+2];
            dst+= eL[n >> 12] + eL[n & 0xFFF];
            len-= 3;
            i+= 3;
        }
        if (len > 0) {
            var n1= (src[i] & 0xFC) >> 2;
            var n2= (src[i] & 0x03) << 4;
            if (len > 1) n2 |= (src[++i] & 0xF0) >> 4;
            dst+= chars[n1];
            dst+= chars[n2];
            if (len == 2) {
                var n3= (src[i++] & 0x0F) << 2;
                n3 |= (src[i] & 0xC0) >> 6;
                dst+= chars[n3];
            }
            if (len == 1) dst+= '=';
            dst+= '=';
        }
        return dst;
    } // end Encode
    return Encode(src);
}


function RiffWawe(da) {

    var data = [];        // Array containing audio samples
    var wav = [];         // Array containing the generated wave file
    var URI = '';     // http://en.wikipedia.org/wiki/Data_URI_scheme

    var H = {                         // OFFS SIZE NOTES
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
    function Mk(k) {
        data = k;
        H.ba = (H.ch * H.b) >> 3;
        H.br = H.ba * H.sr;
        H.ss2 = data.length * (H.b >> 3);
        H.CS = 36 + H.ss2;

        wav = H.CI.concat(
            U32(H.CS),
            H.f,
            H.sc,
            U32(H.ss),
            u16(H.af),
            u16(H.ch),
            U32(H.sr),
            U32(H.br),
            u16(H.ba),
            u16(H.b),
            H.sc2,
            U32(H.ss2),
            (H.b == 16) ? s16(data) : data
        );
        return 'data:audio/wav;base64,'+FastBase64(wav);
    }
    return Mk(da);

} // end RiffWawe
Go();