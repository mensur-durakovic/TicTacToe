import * as actionTypes from '../actions/actionTypes';

const initialState = {
    n: 3,
    grid: null,
    playerName: null,
    playerSymbol: null,
    computerSymbol: null,
    freeSquares: null,
    totalSquares: null,
    logs: [],
    gameStarted: false,
    gameOver: false,
    playerWins: 0,
    computerWins: 0,
    
};

const initUserInput = ( state, action ) => {
    console.log("initUserInput", action);
    return {...state,
        playerName: action.playerName,
        playerSymbol: action.playerSymbol,
        n: action.n,
    }
};

const initGrid = ( state, action ) => {
    const n = state.n;
    const gridArray = Array(n);
    for(let i = 0; i < n; i++){
        gridArray[i] = [];
    }
    for (let i = 0; i < n; i++) { 
        for (let j = 0; j < n; j++) { 
            gridArray[i][j] = ''; 
        } 
    } 
    const playerSymbol = state.playerSymbol ? state.playerSymbol : 'X';
    return {
        ...state,
        playerSymbol: playerSymbol,
        playerName: state.playerName ? state.playerName : "Test",
        computerSymbol: playerSymbol === 'X' ? 'O' : 'X',
        grid: gridArray,
        totalSquares: n*n,
        freeSquares: n*n,
        gameStarted: true,
        gameOver: false,
        logs: []
    }
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const checkWin = (grid, symbol) => {
    
    let win = false;
    let totalSymbols = 0;

    //check horizontal, by rows
    for(let row = 0; row < grid.length; row++){
        totalSymbols = 0;
        const rowArray = grid[row];
        //console.log("rowArray: ", rowArray);
        for(let i = 0; i < rowArray.length; i++){
            if(rowArray[i] === symbol){
                totalSymbols += 1;
            }
        }
        
        //console.log("row result", row + 1, totalSymbols)
        if(totalSymbols === grid.length){
            win = true;
            break;
        }
    }
    if(win) return win;

    //check vertical, by columns
    totalSymbols = 0;
    for(let col = 0; col < grid.length; col++){
        totalSymbols = 0;
        for(let row = 0; row < grid.length; row++){
            if(grid[row][col] === symbol)
                totalSymbols += 1;
            
        }
        //console.log("col result", col + 1, totalSymbols)
        if(totalSymbols === grid.length){
            win = true;
            break;
        }
    }
    if(win) return win;

    //check diagonal, left to right
    totalSymbols = 0;
    for(let i = 0; i < grid.length; i++){
        //console.log("diagonal ", i, i);
        if(grid[i][i] === symbol)
            totalSymbols += 1;
    }
    if(totalSymbols === grid.length){
        win = true;
        return win;
    }

    //check diagonal, right to left
    totalSymbols = 0;
    let column = grid.length - 1;
    for(let i = 0; i < grid.length; i++){
        //console.log("diagonal right to left", i, column);
        if(grid[i][column] === symbol)
            totalSymbols += 1;
        column = column - 1;
    }
    if(totalSymbols === grid.length){
        win = true;
    }

    return win;    
}

const fillSquare = ( state, action ) => {
    console.log("fillSquare reducer", state);
    let freeSquares = state.freeSquares;
    const newGrid = state.grid.map((arr) => {
        return arr.slice();
    });
    newGrid[action.row][action.column] = state.playerSymbol;
    freeSquares = freeSquares - 1;
    console.log("freeSquares", freeSquares);
    let newLog = `${state.playerName} inserted '${state.playerSymbol}' on square [${action.row + 1}, ${action.column + 1}]`;
    let updatedLogs = state.logs.concat(newLog);
    let win = checkWin(newGrid, state.playerSymbol);
    
    if(win){
        const updatedPlayerWins = state.playerWins + 1;
        newLog = `${state.playerName} won!`;
        let updatedLogs = state.logs.concat(newLog);
        return {...state, 
            gameOver: true,
            playerWins: updatedPlayerWins,
            logs: updatedLogs,
            freeSquares: freeSquares,
            grid: newGrid};
    }

    console.log("free squares", freeSquares);
    //make computer move, get random empty square and fill it
    if(freeSquares > 0){
        console.log("free squares available!");
        let fieldOk = false;
        let randomRow;
        let randomColumn;

        while(!fieldOk){
            randomRow = getRandomInt(state.n);
            randomColumn = getRandomInt(state.n);
            if(!newGrid[randomRow][randomColumn])
                break;
        }
        
        newGrid[randomRow][randomColumn] = state.computerSymbol;
        freeSquares = freeSquares - 1;
        console.log("free squares", freeSquares);
        newLog = `Computer inserted '${state.computerSymbol}' on square [${randomRow + 1}, ${action.column}]`;
        updatedLogs = updatedLogs.concat(newLog);
        let win = checkWin(newGrid, state.computerSymbol);

        if(win){
            const updatedComputerWins = state.computerWins + 1;
            newLog = `Computer won!`;
            updatedLogs = updatedLogs.concat(newLog);
            return {...state, 
                gameOver: true,
                freeSquares: freeSquares,
                computerWins: updatedComputerWins,
                logs: updatedLogs,
                grid: newGrid};
        }
    }

    if(freeSquares === 0){
        newLog = `Draw!`;
        updatedLogs = updatedLogs.concat(newLog);
        return {...state, 
            logs: updatedLogs,
            freeSquares: freeSquares,
            gameOver: true,
            grid: newGrid};
    }

    return {...state, 
        logs: updatedLogs,
        freeSquares: freeSquares,
        grid: newGrid};
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_USER_INPUT: return initUserInput( state, action );
        case actionTypes.INIT_GRID: return initGrid( state, action );
        case actionTypes.FILL_SQUARE: return fillSquare(state, action);
        default: return state;
    }
};

export default reducer;