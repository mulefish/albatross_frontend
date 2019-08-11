const points = new Set()
points.add("bi")
points.add("bo")
points.add("bu")
points.add("fs")
points.add("fy")
points.add("ge")
points.add("kc")
points.add("ki")
points.add("ko")

const stones = {};
//stones["A"]={"x":32,"y":32,"col":0,"row":0,"count":1,"bi":0,"wi":0,"status":0}

function getLetter(number) {
    let baseChar = ("A").charCodeAt(0), letters = "";
    do {
        number -= 1;
        letters = String.fromCharCode(baseChar + (number % 26)) + letters;
        number = (number / 26) >> 0; // quick `floor`
    } while (number > 0);

    return letters;
}

/* assumptions: 
- 19 by 19 board
- 640 pixels wide and high
- each cell is 32 pixels wide and high
*/

function main() {
    let limit = 19
    let count = 0
    const size = 32 
    let down = size
    let over = size

       for (let col = 0; col < limit; col++) {
        for (let row = 0; row < limit; row++) {

            const key = col + "_" + row
            count++ 

            let id = getLetter(count)
            id = id.toLowerCase()
            let x = {'x':over,'y':down,'col':col,'row':row, 'count':count, 'bi':0, 'wi':0, 'status':0}
            console.log(`stones['${id}']=${JSON.stringify(x)  }`)
            down += size
        }
        down = size
        over += size
    }
}
main()
