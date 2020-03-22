//boundaries
//collision
//gave a radius. redraw 45 times/sec.
//keysdown[]
var ctx=document.getElementById("canvas").getContext("2d");
var step=12;
document.getElementById("stepper").value=step;
var radius=10;
function Player(x,y) {this.x=x;this.y=y;}
function stepchange(){step=parseInt(document.getElementById("stepper").value);}
function display(ifvisible,id) {document.getElementById(id).style.visibility=ifvisible;}
var players=[
    new Player(window.innerWidth/2-3*radius,window.innerHeight/2-radius)
    ,new Player(window.innerWidth/2-radius,window.innerHeight/2-radius)
    ,new Player(window.innerWidth/2+radius,window.innerHeight/2-radius)
];

function resize() {
    var width=window.innerWidth;var height=window.innerHeight;
    document.getElementById("canvas").width=width-20;
    document.getElementById("canvas").height=height-150;
    players[0].x=width/2-3*radius;players[0].y=height/2-radius;
    players[1].x=width/2-radius;players[1].y=height/2-radius;
    players[2].x=width/2+radius;players[2].y=height/2-radius;
}resize();


var keysdown=[]
function draw(){
    for(var key=0;key<keysdown.length;key++){move(keysdown[key])}//for all keys currently held down
    canvas.width=canvas.width;
    var color;
    for(var player=0;player<players.length;player++){
        //Set colors
        if(player==0){color="F22";}
        else if(player==1){color="F80";}
        else if(player==2){color="FF2";}
        //Draw
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(players[player].x,players[player].y,2*radius,0,2*Math.PI);
        ctx.fill();
        //Wrap edges
        if(players[player].x<0) {players[player].x=canvas.width}
        else if(players[player].x>canvas.width) {players[player].x=0}
        if(players[player].y<0) {players[player].y=canvas.height}
        else if(players[player].y>canvas.height) {players[player].y=0}
        //Collide
        //var dist=Math.sqrt(Math.pow(players[player].x,4));
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(players[player].x,players[player].y,2*radius,0,2*Math.PI);
        ctx.fill();
    }
    setTimeout(draw,1000/45);
}draw();

document.addEventListener('keydown', function(event) {
    var i=keysdown.indexOf(event.keyCode);
    if(i==-1){//Key is not in list already
        keysdown.push(event.keyCode)//Add it to keysdown[]
    }
});
document.addEventListener('keyup', function(event) {
    var i=keysdown.indexOf(event.keyCode)
    if(i!=-1){//Key is in list already
        keysdown.splice(i,1)//Remove it from keysdown[]
    }
})
function move(code){
    switch(code){
        case 37: players[0].x-=step;break;//left
        case 38: players[0].y-=step;break;//up
        case 39: players[0].x+=step;break;//right
        case 40: players[0].y+=step;break;//down
        case 65: players[1].x-=step;break;//A
        case 68: players[1].x+=step;break;//D
        case 83: players[1].y+=step;break;//S
        case 87: players[1].y-=step;break;//W
        case 100: players[2].x-=step;break;
        case 101: players[2].y+=step;break;
        case 102: players[2].x+=step;break;
        case 104: players[2].y-=step;break;
        case 36:resize();break;
    }
}





/*
ctx.fillStyle="#00F";ctx.fillRect(10,0,50,150);
ctx.moveTo(5,5);ctx.lineTo(100,100);ctx.stroke();
ctx.fillStyle="#0F0";ctx.font="30px Arial";ctx.fillText("Success",10,50);//fillText or strokeText

var grd=ctx.createLinearGradient(0,0,200,0);grd.addColorStop(0,"red");grd.addColorStop(1,"white");
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);
*/
/*
Player.draw = function(ctx) {
  ctx.fillRect(this.x,this.y,32,32);
};


*/