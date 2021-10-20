var canvas = document.getElementById("myCanv");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

drawClock();
setInterval(drawClock,1000);

function drawClock() {
    drawFace();
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(){
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = "#FCF6BA";
    ctx.fill();
   
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0,"#000");
    grad.addColorStop(0.5, 'pink');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx,radius){
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num <= 12; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
        
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.75, radius*0.05);
   
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*.02);
}

function drawHand(ctx, pos, length, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}