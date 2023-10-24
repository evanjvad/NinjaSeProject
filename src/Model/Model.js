//keeps track of a puzzle square and Ninja-se's position
export class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export class Square{
    constructor(label, mvmt, key, row, column, lock){
        this.label = label;
        this.mvmt = mvmt; //-1 for wall, 0 for locked, 1 for free/keyspace
        this.key = key; //key object (undefined if not key in space)
        this.row = row;
        this.column = column;
        this.lock = lock;
    }
    place(row, column){
        this.row = row;
        this.column = column;
    }
    location() {
        return new Point(this.row, this.column);
    }
    copy(){
        let p = new Square(this.label, this.mvmt, this.key, this.row, this.column, this.lock);
        return p;
    }
}

export class Key{
    constructor(color){
        //only care about key color if the key exists, otherwise object is undefined.
        this.color = color;
    }
}

export class Puzzle{
    constructor(numRows, numColumns, currLocation, inventory){
        this.numRows = numRows;
        this.numColumns = numColumns; 
        this.currLocation = currLocation; //point of ninja-se
        this.inventory = inventory; //key
    }

    initialize(squares){
        this.squares = squares.map(p => p.copy());
    }
    clone(){
        let copy = new Puzzle(this.numRows, this.numColumns, this.currLocation, this.inventory);
        copy.squares = [];
        for(let p of this.squares){
            let dup = p.copy();
            copy.squares.push(dup);
        }
        return copy;
    }
}

export default class Model{
    //json encoded puzzle
    constructor(info){
        this.initialize(info);
        this.info = info;
    }
    initialize(info)
    {
        let numRows = parseInt(info.board.rows);
        
        let numColumns = parseInt(info.board.columns);

        let numLocks = parseInt(info.numLocks);
        
        let currLocation = new Point(parseInt(info.board.start.x), parseInt(info.board.start.y));
        
        let inventory = undefined;
        
        var allSquares = [];
        
        for(let p of info.squares){
            //create squares from raw JSON 
            allSquares.push(new Square(parseInt(p.label), parseInt(p.mvmt), p.key, parseInt(p.location.x), parseInt(p.location.y), p.lock));
            
        }

        this.puzzle = new Puzzle(numRows, numColumns, currLocation, inventory);
        this.puzzle.initialize(allSquares);
        this.numMoves = 0;
        this.numLocks = numLocks;
        this.victory = false;
        this.showLabels = false; //1-N squares
    }
    copy(){
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.numMoves = this.numMoves;
        m.victory = this.victory;
        m.showLabels = this.showLabels;
        m.numLocks = this.numLocks;
        return m;
    }
}