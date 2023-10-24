import { puzzleInformation } from "../Model/Puzzle";

var BOXSIZE = 100;
var OFFSET = 8;

export class Rectangle{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
//location, size of square(s)
export function computeRectangle(square, key, door){
    //get r,c of the square
    let c = square.location();
    let f = 0; //offset depending on square size
    let d = 1; //divisor depending on ""
    //case for square having a key, or a door 
    //computes inner small square
    if(key){
        f = (BOXSIZE - 2*OFFSET)/2 - (BOXSIZE - 2*OFFSET)/8;
        d = 4;
    }
    //square is a door and needs middle color
    if(door){
        f = (BOXSIZE - 2*OFFSET)/2 - (BOXSIZE - 2*OFFSET)/(1.2*2);
        d = 1.2;
    }
    return new Rectangle(BOXSIZE*c.x + OFFSET + f, BOXSIZE*c.y + OFFSET + f,
                        (BOXSIZE - 2*OFFSET)/d, (BOXSIZE - 2*OFFSET)/d);
}

export function drawPuzzle(model, ctx, puzzle, showLabels){
    ctx.shadowColor = 'black';

    let current =  puzzle.currLocation.x + (puzzle.currLocation.y - 1)*puzzle.numColumns; //convert x,y to 1D array
    
    puzzle.squares.forEach(square => {
        let rect = computeRectangle(square);
        if(square.label == current){
            ctx.fillStyle = '#a349a4'; //ninja-se is here
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            if(model.puzzle.inventory !== undefined){ //he is holding a key!
                let rn = computeRectangle(square, true);
                ctx.fillStyle = model.puzzle.inventory;
                ctx.fillRect(rn.x, rn.y, rn.width, rn.height);
            }
        }
        else if(square.mvmt == 1){
            ctx.fillStyle = 'white'; //free space no key
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            if(!(square.key === undefined)){
                ctx.fillStyle = square.key;
                let rk = computeRectangle(square, true);
                ctx.fillRect(rk.x, rk.y, rk.width, rk.height)
            }
        }
        else if(square.mvmt == -1){
            ctx.fillStyle = 'black';
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        else if(square.mvmt == 0){
            //outer black
            ctx.fillStyle = 'black';//locked door: do color
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            //middle color
            let rc = computeRectangle(square, false, true);
            ctx.fillStyle = square.lock;
            ctx.fillRect(rc.x, rc.y, rc.width, rc.height);
            //inner color
            ctx.fillStyle = 'white';
            let rs = computeRectangle(square, true, false);
            ctx.fillRect(rs.x, rs.y, rs.width, rs.height);
        }
   
    }
    )
}

export function redrawCanvas(model, canvasObj, appObj){
    let a;
    const ctx = canvasObj.getContext('2d');
    //clear canvas based on size
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);
    if(model.puzzle){
        drawPuzzle(model, ctx, model.puzzle, model.showLabels)
    }

}