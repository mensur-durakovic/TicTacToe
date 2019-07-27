import React from 'react';
import styled from 'styled-components';

const InfoProviderWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const GameTitle = styled.div`
    width: 80%;
    height: 40px;
    margin: 10px 10px;
    font-size: 45px;
    text-align: center;
    font-weight: bold;

    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px) {
        font-size: 15px;
        width: 70%;
    }

    @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) {
        font-size: 35px;
    }

`;
const Score = styled.div`
    width: 20%;
    height: 40px;
    margin: 10px 10px;
    font-size: 25px;
    text-align: left;
    font-weight: bold;
    text-transform: capitalize;

    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px) {
        font-size: 13px;
        width: 30%;
    }

    @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) {
        font-size: 20px;
    }
`;

const infoProvider = (props) => {
    return (
        <InfoProviderWrapper>
            <GameTitle>Tic Tac Toe - Game</GameTitle>
            <Score>
                {props.playerName}: {props.playerWins}<br/>
                Computer: {props.computerWins}
            </Score>
        </InfoProviderWrapper>
    )
}

export default infoProvider
