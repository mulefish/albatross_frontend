const canvas = document.getElementById("background");
const context = canvas.getContext('2d');
const glass_canvas = document.getElementById("glasspane");
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
function getId(col, row) { 
    let c = getLetter(col)
    let r = getLetter(row )
    let id = c + r
    id = id.toLowerCase()
    //console.log( "c : " + col + " and "+ row )
    return id 
}
function getLetter(number) {
    let baseChar = ("A").charCodeAt(0), letters = "";
    do {
        number -= 1;
        letters = String.fromCharCode(baseChar + (number % 26)) + letters;
        number = (number / 26) >> 0; // quick `floor`
    } while (number > 0);

    return letters;
}

function addStone() {
    if (active != null) {
        glass_context.clearRect(0, 0, 640, 640);

        let color = "rgba(0,0,0, 1.0)"
        if (turn === black) {
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
        const col = stones[active].col
        const row = stones[active].row
        context.beginPath();
        context.arc(x, y, 32 / 2, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.stroke();

        const neighbors = {
            north:getId(col + 1, row),
            west:getId(col, row  + 1),
            south:getId(col + 1, row + 2),
            east:getId(col + 2, row + 1)
        }
        //console.log("active: " + active + " x " + x + " y " + y + " col " + col + " row " + row  )
        //console.log("north: " + north )
        //console.log("west: " + west )
        //console.log("east: " + east )
        active = null;

        for ( let key in neighbors) {
            let id = neighbors[key]
            console.log("key: " + key + " id " + id )
            if ( stones.hasOwnProperty(id)) {
                context.beginPath();
                let x = stones[id].x
                let y = stones[id].y
        
                context.arc(x, y, 32 / 2, 0, 2 * Math.PI);
                color = "rgba(255,0,0,1.0)"
                context.fillStyle = color;
                context.fill();
                context.stroke();
    
            }   
        }

        /* 
        if ( stones.hasOwnProperty(east)) {
            context.beginPath();
            let ex = stones[east].x
            let ey = stones[east].y
    
            context.arc(ex, ey, 32 / 2, 0, 2 * Math.PI);
            color = "rgba(255,0,0,1.0)"
            context.fillStyle = color;
            context.fill();
            context.stroke();
            } 



        if ( stones.hasOwnProperty(north)) {
        context.beginPath();
        let nx = stones[north].x
        let ny = stones[north].y

        context.arc(nx, ny, 32 / 2, 0, 2 * Math.PI);
        color = "rgba(0,255,255,1.0)"
        context.fillStyle = color;
        context.fill();
        context.stroke();
        } 
        if ( stones.hasOwnProperty(west)) {
            context.beginPath();
            let wx = stones[west].x
            let wy = stones[west].y
    
            context.arc(wx, wy, 32 / 2, 0, 2 * Math.PI);
            color = "rgba(0,0,255,1.0)"
            context.fillStyle = color;
            context.fill();
            context.stroke();
            } 

            if ( stones.hasOwnProperty(south)) {
                context.beginPath();
                let sx = stones[south].x
                let sy = stones[south].y
        
                context.arc(sx, sy, 32 / 2, 0, 2 * Math.PI);
                color = "rgba(122,0,255,1.0)"
                context.fillStyle = color;
                context.fill();
                context.stroke();
                } 
    */ 
    }
}

function drawLine(pos) {
    if (status === placing) {
        let x = -1
        let y = -1
        let dist = 100000
        for (const key in stones) {
            if (stones[key].status === 0) {
                const stoneX = stones[key].x
                const stoneY = stones[key].y
                const d = Math.sqrt(Math.pow((pos.x - stoneX), 2) + Math.pow((pos.y - stoneY), 2))
                if (d < dist) {
                    x = stoneX
                    y = stoneY
                    dist = d
                    active = key
                }
            }
        }
        if (dist < 200) {
            glass_context.clearRect(0, 0, 640, 640);
            glass_context.strokeStyle = "rgba(255,255,255,1.0)"
            glass_context.fillStyle = "rgba(255,255,255,0.3)"
            glass_context.fillRect(x - 16, y - 16, 32, 32)

            document.getElementById("active").innerHTML = active
        } else {
            document.getElementById("active").innerHTML = ""
        }
    }
}

function init() {

    glass_canvas.addEventListener('click', function(evt) {
        clicks(getMousePos(evt));
    }, false);
    glass_canvas.addEventListener('mouseup', function(evt) {
        mouseUp(getMousePos(evt));
    }, false);
    glass_canvas.addEventListener('mousedown', function(evt) {
        mouseDown(getMousePos(evt));
    }, false);
    glass_canvas.addEventListener('mousemove', function(evt) {
        mouseMove(getMousePos(evt));
    }, false);

    setupBoard()
}

function setupBoard() {
    glass_context.font = "10pt sans-serif";
    context.font = "10pt sans-serif";

    glass_context.strokeStyle = "rgba(0,0,0,1)";
    glass_context.lineWidth = 1;
    context.lineWidth = 0.3;

    context.stroke();

    glass_context.clearRect(0, 0, 640, 640);
    context.clearRect(0, 0, 640, 640);


    let down = size
    let count = 0
    let over = size
    context.beginPath();
    let alpha = 1.0;

    //const chocalate = "rgba(210,105,30,1.0)";
    const saddlebrown = "rgba(139,69,19,0.9)";
    //    const sienna= "rgba(160,82,45,1.0)";
    context.fillStyle = saddlebrown
    context.fillRect(4, 4, 632, 632)
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

    for (let key in stones) {
        //context.fillText(stones[key].col + "_" + stones[key].row, stones[key].x - 5 ,stones[key].y - 5);

        if (points.has(key)) {
            const x = stones[key].x
            const y = stones[key].y
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fillStyle = "rgba(0,0,0, " + alpha + ")";
            context.fill();
            context.stroke();
        }
    }
}

function selectHistory() {

    document.getElementById("turn").innerHTML = "black"
    document.getElementById("active").innerHTML = ""
    active = null;
    glass_context.clearRect(0, 0, 640, 640);
    setupBoard();

    const widget = document.getElementById("trainingGame")
    const selectedHistory = widget.options[widget.selectedIndex].text;
    url = "http://localhost:5000/history/" + selectedHistory + "/"

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            data = data.replace(/"/g, "")
            raw_moves = data.split(";")
            let moves = []
            for (let index in raw_moves) {
                let x = raw_moves[index]
                x = x.replace("[", "")
                x = x.replace("]", "")
                if (x.includes("B")) {
                    x = x.replace("B", "")
                    moves.push({
                        "id": x,
                        "side": "B"
                    })
                } else if (x.includes("W")) {
                    x = x.replace("W", "")
                    moves.push({
                        "id": x,
                        "side": "W"
                    })
                }
            }

            for (index in moves) {
                active = moves[index].id
                console.log("active " + active)
                addStone()
            }
        })
        .catch(err => {
            alert("Failed to load moves: " + err)
        })
    for (let key in stones) {
        stones[key].status = 0
    }
}