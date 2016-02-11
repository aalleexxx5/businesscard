var c,ctx, SIZE_OF_SPECTRUM,SIZE_OF_SQUARE,tock,glow= 0,animation,shouldGlow=true, whiteshift= 0, mousePos, introComplete;
var CENTER_X,CENTER_Y;
const UPDATE_FREQ = 20;
const ANIMATION_DURATION = 50;
const INITIAL_ROTATION = 0.25;
const GLOW_DURATION=1000;
var f=0;
function init() {
    function resize(){
        SIZE_OF_SPECTRUM = Math.floor(((window.innerWidth/2)/100))*100;
        SIZE_OF_SQUARE = SIZE_OF_SPECTRUM/5;
        CENTER_X=Math.floor(window.innerWidth/2);
        CENTER_Y=Math.floor(window.innerHeight/2);
        c.width=window.innerWidth;
        c.height=window.innerHeight;
        ctx.fillStyle="#141221";
        ctx.fillRect(0,0,c.width,c.height);
        if(boxes[0]!=undefined){
            if(boxes[0].s>SIZE_OF_SQUARE) {
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].s = SIZE_OF_SQUARE;
                }
            }
            for (i = 0; i < boxes.length; i++) {
                boxes[i].x = CENTER_X+(i*SIZE_OF_SQUARE*1.5)-(2*SIZE_OF_SQUARE*1.5+SIZE_OF_SQUARE/2);
                boxes[i].y = CENTER_Y-SIZE_OF_SQUARE/2;
            }
        }
    }
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    resize();
    window.addEventListener("resize", resize,false);

    ctx.fillStyle = constructGlow(1);
    ctx.fillRect(10,10,SIZE_OF_SPECTRUM,SIZE_OF_SQUARE);
    animation = setInterval(update,UPDATE_FREQ);
    window.requestAnimationFrame(draw);
}


var boxes = [];
function Box(x,y,s,r){
    this.x=x;
    this.y=y;
    this.s=s;
    this.r=r;
}

function update() {//updates values once every ~20msec
    if(!introComplete){
        introComplete = introAnimation();
    }else{
        var mouseOnElement = -1;
        for(var i=0;i<boxes.length;i++) {
            if (mousePos.x > boxes[i].x && mousePos.x < boxes[i].x + boxes[i].s && mousePos.y > boxes[i].y && mousePos.y < boxes[i].y + boxes[i].s) {//if mouse is on top of a box
                mouseOnElement = i;
                for (var j = 0; j < i; j++) {//boxes that needs to move left
                    if (boxes[i - 1].x + SIZE_OF_SQUARE * 1.2 > boxes[i].x) {
                        boxes[j].x--;
                    }
                }
                for (j = i + 1; j < boxes.length; j++) {//boxes that needs to move right
                    if (boxes[i].x + SIZE_OF_SQUARE * 1.2 > boxes[i + 1].x) {
                        boxes[j].x++;
                    }
                }
            }
        }
        for(i=0;i<boxes.length;i++){
            if (mouseOnElement==-1){
                if(boxes[i].x<CENTER_X+(-SIZE_OF_SQUARE*0.5)+SIZE_OF_SQUARE*(i-2)){
                    boxes[i].x++;
                }else if(boxes[i].x>CENTER_X+(-SIZE_OF_SQUARE*0.5)+SIZE_OF_SQUARE*(i-2)){
                    boxes[i].x--;
                }
            }else{
                if(i<mouseOnElement-1){
                    if(boxes[i].x+boxes[i].s<boxes[i+1].x){
                        boxes[i].x++;
                    }
                }else if(i>mouseOnElement+1){
                    if (boxes[i-1].x+boxes[i-1].s<boxes[i].x){
                        boxes[i].x--;
                    }
                }
            }

        }
    }

    f++;
}

function draw(){ //runes every Frame by browser
    ctx.fillStyle="#141221";
    ctx.fillRect(0,0,c.width,c.height);
    if (whiteshift!=0){
        ctx.fillStyle="rgba(255,255,255,"+whiteshift.toString()+")";
        ctx.fillRect(0,0,c.width,c.height);

    }
    if(glow>0&&glow<=1){
        drawGlowEffect();
    }
//    ctx.fillStyle="#ffffff";
//    ctx.fillText(tock.toString(),50,50);
    for(var i=0;i<boxes.length;i++){
        ctx.save();
        ctx.translate(boxes[i].x+SIZE_OF_SQUARE/2,boxes[i].y+SIZE_OF_SQUARE/2);
        ctx.rotate(boxes[i].r*Math.PI);
        ctx.translate(-SIZE_OF_SQUARE/2,-SIZE_OF_SQUARE/2);
        ctx.fillStyle = constructGradient(i);
        ctx.fillRect(0,0,boxes[i].s,SIZE_OF_SQUARE);
        ctx.restore();
    }
    window.requestAnimationFrame(draw);
}

function introAnimation(){
    tock = Math.floor(f / ANIMATION_DURATION);

    //Add boxes on screen
    if (boxes.length < 5 && tock == boxes.length) {
        boxes[tock] = createBox(tock);
    }
    else if (boxes[4] == undefined) {
    }
    //expand boxes
    else if (boxes[0].s < SIZE_OF_SQUARE) {
        if (tock > 4) {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].s++;
            }
        }
    }
    //rotate boxes
    else if (boxes[4].r >= 0) {
        for (i = 0; i < boxes.length; i++) {
            if (boxes[i].r != 0) {
                boxes[i].r -= 0.1 * (INITIAL_ROTATION / 5);
            }
        }
    }
    //Add glow effect
    else if(boxes[4].r<=0&&glow<1&&boxes[0]&&shouldGlow){
        glow+=UPDATE_FREQ/GLOW_DURATION;
        if (glow>1){
            glow=1;
        }
    }
    //Move boxes
    else if(boxes[0].x+boxes[0].s<=boxes[1].x-1) {
        shouldGlow=false;
        for (i = 0; i < boxes.length; i++) {
            boxes[i].x -= SIZE_OF_SQUARE * 0.5 * (i - 2) * UPDATE_FREQ / (GLOW_DURATION*0.1);
        }
        glow-=UPDATE_FREQ/(GLOW_DURATION*0.1);
    }
    //combine boxes and stop animation
    else if (whiteshift < 0.5&& glow<3){
        glow=2;
        whiteshift+=0.025;
    }
    else if(whiteshift>=0){
        whiteshift-=0.025;
        glow=3;
    }else if(mousePos==undefined){
        mousePos=0;
        c.addEventListener("mousemove",function(evt) {
            mousePos={x:evt.clientX,y:evt.clientY};
        },false);
    }else return true;
    return false;
}

function drawGlowEffect(){
    ctx.fillStyle=constructGlow(glow);
    for(var i=0;i<boxes.length;i++){
        ctx.save();
        for(f=0;f<4;f++){
            ctx.save();
            ctx.translate(boxes[i].x+SIZE_OF_SQUARE/2,boxes[i].y+SIZE_OF_SQUARE/2);
            ctx.rotate(f*0.5*Math.PI);
            ctx.translate(SIZE_OF_SQUARE/2,-SIZE_OF_SQUARE/2);
            ctx.fillRect(0,0,SIZE_OF_SQUARE/4,SIZE_OF_SQUARE);
            ctx.translate(0,SIZE_OF_SQUARE);
            ctx.fillStyle=constructGlowCorner(glow);
            ctx.fillRect(0,0,SIZE_OF_SQUARE/4,SIZE_OF_SQUARE/4);
            ctx.restore();
        }
        ctx.restore();
    }
}

function createBox(num){
    return new Box(CENTER_X+(num*SIZE_OF_SQUARE*1.5)-(2*SIZE_OF_SQUARE*1.5+SIZE_OF_SQUARE/2),CENTER_Y-SIZE_OF_SQUARE/2,20,INITIAL_ROTATION);
}

function constructGlow(num){//num is 0-1
    var grd = ctx.createLinearGradient(0,0,SIZE_OF_SQUARE/4,0);
    grd.addColorStop(0,"rgba(255,255,255,"+num.toString()+")");
    grd.addColorStop(1,"transparent");
    return grd;
}

function constructGlowCorner(num){
    var grd = ctx.createRadialGradient(0,0,0,0,0,SIZE_OF_SQUARE/4);
    grd.addColorStop(0,"rgba(255,255,255,"+num.toString()+")");
    grd.addColorStop(1,"transparent");
    return grd;
}

function constructGradient(num){
    var grd = ctx.createLinearGradient(-(SIZE_OF_SQUARE*num),0,SIZE_OF_SPECTRUM-(SIZE_OF_SQUARE*num),num);
    grd.addColorStop(0,"#211E3D");
    grd.addColorStop(0.142,"#30327C");
    grd.addColorStop(0.34,"#63C9FC");
    grd.addColorStop(0.456,"#0BBB56");
    grd.addColorStop(0.7,"#F7E920");
    grd.addColorStop(1,"#FF3A30");
    return grd;
}