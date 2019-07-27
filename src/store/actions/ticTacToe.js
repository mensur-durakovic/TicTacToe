import * as actionTypes from './actionTypes';

export const initGrid = (n) => {
    console.log("action initGrid");
    return {
        type: actionTypes.INIT_GRID
    };
}

export const fillSquare = ( row, column ) => {
    console.log("action fillSquare");
    return {
        type: actionTypes.FILL_SQUARE,
        row: row, 
        column: column
    };
}

export const initUserInput = (playerName, playerSymbol, n) => {
    return {
        type: actionTypes.INIT_USER_INPUT,
        playerName: playerName,
        playerSymbol: playerSymbol,
        n: n
    };
}