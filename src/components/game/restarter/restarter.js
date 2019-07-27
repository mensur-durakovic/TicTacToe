import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: transparent;
    border: 1 px solid #ccc;
    border-radius: 10%;
    color: black;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
`;

const Restarter = (props) => {
    return (
        <div>
            <Button onClick={props.restartGame}>Restart </Button>
            <Button onClick={props.toMainMenu}>To main menu </Button>
        </div>
    )
}

export default Restarter
