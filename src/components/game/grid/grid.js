import React from 'react'
import styled from 'styled-components';

import GridSquare from '../gridSquare/gridSquare';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.n}, 1fr);
  margin-bottom: 15px;
  pointer-events: ${props => (props.gameOver ? "none" : "all")};
  opacity: ${props => (props.gameOver && props.gameStarted ? "0.4" : "1")};
`;


const Grid = (props) => {
    return (
        <GridWrapper n={props.n} 
            gameStarted={props.gameStarted}
            gameOver={props.gameOver}
        >
            {
                props.grid.map((row, rowNumber) => {
                    return row.map((element, columnNumber) => 
                        <GridSquare
                        key={`${rowNumber}-${columnNumber}`} 
                        row={rowNumber} 
                        column={columnNumber} 
                        gridElement={element}
                        gameOver={props.gameOver}
                        fillSquare={props.fillSquare}
                    />
                    )
                })
            }
        </GridWrapper>
    )
}

export default Grid
