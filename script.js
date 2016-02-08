var c,ctx, SIZE_OF_SPECTRUM,SIZE_OF_SQUARE;
var CENTER_X,CENTER_Y;
const UPDATE_FREQ = 20;
const ANIMATION_DURATION = 50;
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

    ctx.fillStyle = constructGradiant(0);
    ctx.fillRect(10,10,SIZE_OF_SPECTRUM,SIZE_OF_SQUARE);
    setInterval(update,UPDATE_FREQ);
}


var boxes = [];
function Box(x,y,s,n){
    this.x=x;
    this.y=y;
    this.s=s;
    this.n=n;
}

function update(){
    ctx.fillStyle="#141221";
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle="#ffffff";
    var animationPhase = Math.floor(f/ANIMATION_DURATION);
    ctx.fillText(animationPhase.toString(),50,50);

    //draw boxes on screen
    if (boxes.length<5&&animationPhase==boxes.length){
        boxes[animationPhase]=createBox(animationPhase);
    } else if(animationPhase > 4 && boxes[0].s<SIZE_OF_SQUARE){
        for(i=0;i<boxes.length;i++){
            boxes[i].s++;
        }
    }
    //expand boxes

    for(var i=0;i<boxes.length;i++){
        ctx.save();
        ctx.translate(boxes[i].x,boxes[i].y);
        ctx.fillStyle = constructGradiant(i);
        ctx.fillRect(0,0,boxes[i].s,SIZE_OF_SQUARE);
        ctx.restore();
    }
    f++;
}


function createBox(num){
    return new Box(CENTER_X+(num*SIZE_OF_SQUARE*1.5)-(2*SIZE_OF_SQUARE*1.5+SIZE_OF_SQUARE/2),CENTER_Y-SIZE_OF_SQUARE/2,20,0);
}

function constructGradiant(num){
    var grd = ctx.createLinearGradient(-(SIZE_OF_SQUARE*num),0,SIZE_OF_SPECTRUM-(SIZE_OF_SQUARE*num),num);
    grd.addColorStop(0,"#211E3D");
    grd.addColorStop(0.142,"#30327C");
    grd.addColorStop(0.34,"#63C9FC");
    grd.addColorStop(0.456,"#0BBB56");
    grd.addColorStop(0.7,"#F7E920");
    grd.addColorStop(1,"#FF3A30");
    return grd;
}