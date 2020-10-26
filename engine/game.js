/*
Add your code for Game here
 */


export default class Game{


    constructor(dimensions) {
        this.dim = dimensions;
        this.gameState = {
            board: new Array(this.dim * this.dim).fill(0),
            score: 0,
            won: false,
            over: false
        };
        
        this.listeners = {
            'onMove': [],
            'onWin': [],
            'onLose': []
        };
        this.addPiece();
        this.addPiece();
        
    }

    addPiece() {
        let zeros = this.gameState.board.filter(x => x == 0);
        if (zeros.length > 0){
            let numZeros = zeros.length;
            let rand = Math.floor(Math.random() * Math.floor(numZeros)) + 1;
        
            var count = 0;
            for (var i = 0; i < this.gameState.board.length; i++){
                if (this.gameState.board[i] == 0){
                    count++;
                }
                if (count == rand){
                    this.gameState.board[i] = this.newNum();
                    count++;
                }
            }
        }
        
    }
    newNum() {
        if (Math.floor(Math.random() * 10) == 0){
            return 4
        }else{
            return 2;
        }
    }


    setupNewGame() {
        
        this.gameState = {
            board: new Array(this.dim * this.dim).fill(0),
            score: 0,
            won: false,
            over: false
        };
        
        this.addPiece();
        this.addPiece();
    }

    loadGame(gs) {
        this.gameState = gs;
    }

    
    rotateLeft() {
        
        let matrix = new Array(this.dim);
        for (var i = 0; i < this.dim; i++){
            matrix[i] = new Array(this.dim)
            for (var j = 0; j < this.dim; j++){
                matrix[i][j] = this.gameState.board[i*this.dim + j];
            }
        }
        const n = matrix.length;
        const x = Math.floor(n/ 2);
        const y = n - 1;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                let k = matrix[i][j];
                matrix[i][j] = matrix[y - j][i];
                matrix[y - j][i] = matrix[y - i][y - j];
                matrix[y - i][y - j] = matrix[j][y - i]
                matrix[j][y - i] = k
            }
        }
        for (var i = 0; i < this.dim; i++){
            for (var j = 0; j < this.dim; j++){
                this.gameState.board[i*this.dim + j] = matrix[i][j];
            }
        }
        this.gameState.board.reverse();
    }

    rotateRight() {
        let matrix = new Array(this.dim);
        for (var i = 0; i < this.dim; i++){
            matrix[i] = new Array(this.dim)
            for (var j = 0; j < this.dim; j++){
                matrix[i][j] = this.gameState.board[this.dim*i + j];
            }
        }
        const n = matrix.length;
        const x = Math.floor(n/ 2);
        const y = n - 1;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                let k = matrix[i][j];
                matrix[i][j] = matrix[y - j][i];
                matrix[y - j][i] = matrix[y - i][y - j];
                matrix[y - i][y - j] = matrix[j][y - i]
                matrix[j][y - i] = k
            }
        }
        for (var i = 0; i < this.dim; i++){
            for (var j = 0; j < this.dim; j++){
                this.gameState.board[this.dim*i + j] = matrix[i][j];
            }
        }

    }
    
    possibleMoves(array) {
        for (var i = 0; i < this.dim; i++){
            for (var j = 0; j < this.dim; j++){
                if (this.dim*i + j - 1 >= this.dim*i){
                    let left = array[this.dim*i + j - 1];
                    if (array[this.dim*i + j] == left) return true;
                }
                if (this.dim*i + j + 1 <= this.dim*(i+1)-1){
                    let right = array[this.dim*i + j + 1];
                    if (array[this.dim*i + j] == right) return true;
                }
                if (this.dim*(i-1) + j >= 0){
                    let top = array[this.dim*(i-1) + j];
                    if (array[this.dim*i + j] == top) return true;
                }
                if (this.dim*(i+1) + j < this.dim**2){
                    let bottom = array[this.dim*(i+1) + j];
                    if (array[this.dim*i + j] == bottom) return true;
                }
            }
        }
        return false;
    }

    
    move(direction) {
        let moved = false;

        if(direction === "right"){
            this.rotateLeft();
        }else if(direction === "left"){
            this.rotateRight();
        }else if(direction === "down"){
            this.rotateRight();
            this.rotateRight();
        }


        for (var i = 0; i < this.dim; i++){
            let arr = new Array(this.dim);
            let index = 0;
            for (var j = i; j < this.dim*this.dim; j+=this.dim){
                arr[index] = this.gameState.board[j];
                index++;
            }
            
            let nonZero = arr.filter(x => x != 0);
            if (nonZero.length > 0){
                index = 0;
                while (index < nonZero.length - 1){
                    if(nonZero[index] == nonZero[index + 1]){
                        nonZero[index] += nonZero[index + 1];
                        this.gameState.score += nonZero[index];
                        nonZero[index + 1] = 0;
                        index++;
                    }
                    
                    index++;
                }
                let newNonZero = nonZero.filter(x => x != 0);
                let newArray = [];
                for (var idx = 0; idx < this.dim; idx++){
                    if (idx < newNonZero.length){
                        newArray.push(newNonZero[idx]);
                    }else{
                        newArray.push(0);
                    }
                }
                if (JSON.stringify(arr) != JSON.stringify(newArray)){
                    moved = true;
                }
                
                let anotherIndex = 0
                for (var start = i; start < this.dim*this.dim; start+=this.dim){
                    this.gameState.board[start] = newArray[anotherIndex];
                    anotherIndex++;
                }
            }
            
        }

        if (direction === "right"){
            this.rotateRight();
        }else if(direction === "left"){
            this.rotateLeft();
        }else if(direction === "down"){
            this.rotateLeft();
            this.rotateLeft();
        }

        

        if (moved){
            if(this.gameState.board.includes(0)){
                this.addPiece();
            }
            this.listeners['onMove'].forEach(callback => callback(this.gameState));
            
            
        }
        if (!this.possibleMoves(this.gameState.board) && !this.gameState.board.includes(0)){
            this.gameState.over = true;
            this.listeners['onLose'].forEach(callback => callback(this.gameState));
        }

        if (this.gameState.board.filter(x => x == 2048).length > 0) {
            this.gameState.won = true;
            this.listeners['onWin'].forEach(callback => callback(this.gameState));
        }
        
    }


    toString() {
        let state = "";
        for (var i = 0; i < this.gameState.board.length; i++){
            if (i !== 0 && i%this.dim === 0) state += "\n";
            state += " ";
            state += (this.gameState.board[i]);
            state += " ";
        }

        return state
    }

    onMove(callback) {
        this.listeners['onMove'].push(callback);
    }
    onWin(callback) {
        this.listeners['onWin'].push(callback);
    }
    onLose(callback) {
        this.listeners['onLose'].push(callback);
    }


    getGameState() {
        return this.gameState;
    }


}

