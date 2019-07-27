import React from 'react'
import styled from 'styled-components';

const LoggerWrapper = styled.div`
    width: 80%;
    margin: auto;
    margin: 10px 10px;
    font-size: 30px;
    font-weight: bold;
    overflow-y: auto;
    text-transform: capitalize;

    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px) {
        font-size: 13px;
    }


    @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) {
        font-size: 25px;
    }
`;

const Logger = (props) => {
    return (
        <LoggerWrapper>
            {
                props.logs.map((log, index) =>
                    <p key={index}> {index + 1}) {log} </p>
                )
            }
        </LoggerWrapper>
    )
}

export default Logger;
