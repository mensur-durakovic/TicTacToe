import React from 'react';
import styled from 'styled-components';

const StyledGridSquare = styled.div`
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
  background: papayawhip;
  color: palevioletred;
  border: 1px solid #ccc;
  pointer-events: ${props => (props.squareFilled || props.gameOver ? "none" : "all")};
  cursor: ${props => (props.squareFilled || props.gameOver ? "not-allowed" : "pointer")};
  align-items: center;
  justify-content: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer 10+/Edge */
  user-select: none; /* Standard */
`;

const gridSquare = props => {
    return (
        <StyledGridSquare 
            squareFilled={props.gridElement} 
            gameOver={props.gameOver}
            onClick={() => props.fillSquare(props.row, props.column)}>
            {/*`${props.row+1}-${props.column+1}`*/} 
            {props.gridElement}
        </StyledGridSquare>
    )
}

export default gridSquare;
