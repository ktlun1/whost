const ws = new WebSocket("ws://localhost:8000/ws");

const canvas = $("#canvas");
const ctx = canvas.get(0).getContext("2d");

ws.addEventListener("message", (event) => {
    request = JSON.parse(event.data);
    handleMessage(request)
});


function handleMessage(event){
    switch (event["type"]){
        case "line":
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = "black";
            ctx.moveTo(event.sx, event.sy);
            ctx.lineTo(event.px, event.py);
            ctx.stroke();
            break;

        case "clear":
            ctx.clearRect(0, 0, canvas.get(0).width, canvas.get(0).height);
            break;

        case "group":
            for(let x in event["group"]){
                handleMessage(event["group"][x]);
            }
            break;

        case "timer":
            $("#timer").html("Reset in: " + event["timer"]);
            break;
    }
}

let draw = false;

let startPostion = {x: 0, y:0}
let position = {x: 0, y:0}

function updatePostion(event){
    startPostion.x = event.clientX - canvas.get(0).offsetLeft;
    startPostion.y = event.clientY - canvas.get(0).offsetTop;
}

canvas.on("mousedown", (event)=>{
    draw = true
    updatePostion(event);
});

canvas.on("mousemove", (event)=>{
    if(draw){
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
    	ctx.strokeStyle = "black";
        position = {...startPostion}
        ctx.moveTo(startPostion.x, startPostion.y);
        updatePostion(event);
        ctx.lineTo(startPostion.x, startPostion.y);
        ctx.stroke();
        ws.send(JSON.stringify({type: "line", sx: position.x, sy: position.y, px: startPostion.x, py: startPostion.y}))
    }
});

canvas.on("mouseup", (event)=>{
    draw = false
});
