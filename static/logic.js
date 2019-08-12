const canvas = document.getElementById("background");
const context = canvas.getContext('2d');const glass_canvas = document.getElementById("glasspane");
const glass_context = glass_canvas.getContext('2d');
const size = 32
let placing = "PLACING"
let show = "SHOW"
let waiting = "WAITING"
let status = placing
let active = null;
const black = 9
const white = 1
let turn = black
function addStone() { 
    if ( active != null ) { 
        glass_context.clearRect(0,0,640,640); 

        let color = "rgba(0,0,0, 1.0)"
        if ( turn === black ) {
            turn = white            
            stones[active].status = black
            document.getElementById("turn").innerHTML = "white"
        } else {
            color = "rgba(255,255,255,1.0)"
            turn = black
            stones[active].status = white
            document.getElementById("turn").innerHTML = "black"

        }
        const x = stones[active].x
        const y = stones[active].y
        context.beginPath();
        context.arc(x,y, 32 / 2, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.stroke();
        active = null;
    }
}
function drawLine(pos) {
    if ( status === placing ) {
        let x = -1
        let y = -1
        let dist = 100000
        for (const key in stones ) {
            if ( stones[key].status === 0 ) {
                const stoneX = stones[key].x
                const stoneY = stones[key].y
                const d = Math.sqrt(Math.pow((pos.x - stoneX), 2) + Math.pow((pos.y - stoneY), 2))
                if ( d < dist ) { 
                    x=stoneX
                    y=stoneY
                    dist = d
                    active = key
                }
            }    
        }      
        if ( dist < 200 ){
            glass_context.clearRect(0,0,640,640); 
            glass_context.strokeStyle = "rgba(255,255,255,1.0)"
            glass_context.fillStyle = "rgba(255,255,255,0.3)"
            glass_context.fillRect(x - 16,y - 16,32,32 )

            document.getElementById("active").innerHTML = active
        } else {
            document.getElementById("active").innerHTML = ""           
        }
    } 
}

function init() {

    glass_canvas.addEventListener('click', function(evt) { clicks(getMousePos(evt)); }, false);
    glass_canvas.addEventListener('mouseup', function(evt) { mouseUp(getMousePos(evt));}, false);
    glass_canvas.addEventListener('mousedown', function(evt) { mouseDown(getMousePos(evt));}, false);
    glass_canvas.addEventListener('mousemove', function(evt) { mouseMove(getMousePos(evt));}, false);

    setupBoard()
} 

function setupBoard() {
    glass_context.font = "10pt sans-serif";
    context.font = "10pt sans-serif";

    glass_context.strokeStyle = "rgba(0,0,0,1)";
    glass_context.lineWidth = 1;
    context.lineWidth = 0.3;
    //context.moveTo(0,100);
    //context.lineTo(333,200);
    context.stroke();

    glass_context.clearRect(0,0,640,640); 
    context.clearRect(0,0,640,640); 


    let down = size
    let count = 0
    let over = size
    context.beginPath();
    let alpha = 1.0;

    //const chocalate = "rgba(210,105,30,1.0)";
    const saddlebrown= "rgba(139,69,19,0.9)";
    //    const sienna= "rgba(160,82,45,1.0)";
    context.fillStyle = saddlebrown
    context.fillRect(4,4,632,632 )
    context.beginPath();
    context.strokeStyle = "rgba(30,30,30,1.0)"; // gray
    context.lineWidth = 1;
    context.fillStyle = "rgba(0,0,0, " + alpha + ")";
    const limit = 19
    for (let col = 0; col < limit; col++) {
        context.beginPath();
        context.moveTo(size, down)
        context.lineTo(640 - size, down)
        context.stroke();
        count++
        down += size
    }
    count = 0
    for (let row = 0; row < limit; row++) {
        context.beginPath();
        context.moveTo(over, size)
        context.lineTo(over, 640 - size)
        context.stroke();
        count++
        over += size
    }
    down = size
    over = size
    count = 0 

    for ( let key in stones ) { 
        //context.fillText(key, stones[key].x + 10,stones[key].y - 5);

        if ( points.has(key)) { 
            const x = stones[key].x
            const y = stones[key].y
            context.beginPath();
            context.arc(x,y, 5, 0, 2 * Math.PI);
            context.fillStyle = "rgba(0,0,0, " + alpha + ")";
            context.fill();
            context.stroke();
        }
    }
}

function selectHistory() { 

    document.getElementById("turn").innerHTML = "black"
    document.getElementById("active").innerHTML = ""           
    active=null; 
    glass_context.clearRect(0,0,640,640); 
    setupBoard(); 

    const widget = document.getElementById("trainingGame")
    const selectedHistory = widget.options[widget.selectedIndex].text;
    url = "http://localhost:5000/history/" + selectedHistory + "/"

    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        data = data.replace(/"/g,"")
        raw_moves = data.split(";")
        let moves = []
        for ( let index in raw_moves ) { 
            let x = raw_moves[index]
            x = x.replace("[","")
            x = x.replace("]",""    )
            if ( x.includes("B")) {
                x = x.replace("B","")
                moves.push({"id":x,"side":"B"})
            } else if ( x.includes("W")) {
                x = x.replace("W","")
                moves.push({"id":x,"side":"W"})
            }         
        }

        for ( index in moves ) {
            active = moves[index].id
            console.log("active " + active)
            addStone()
        }
    
        //console.log(JSON.stringify(moves,null,2))


    })
    .catch(err => {
        alert("Failed to load moves: " + err )
    })



    for ( let key in stones ) { 
        stones[key].status = 0 
    }
}