import React from "react";

import styled from 'styled-components';

const FormElementWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const FormLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

const FormInput = styled.input`
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    :focus{
        outline: none;
        background-color: #ccc;
    }
`;

const FormSelect = styled.select`
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    :focus{
        outline: none;
        background-color: #ccc;
    }
`;

const ValidationMessage = styled.p`
    color: red;
    margin: 5px 0;
`;

const FormInputElement = (props) => {

    return (
        <FormElementWrapper>
            <FormLabel>{props.labelText}</FormLabel>
            {
                props.type === "input" 
                ? <FormInput type="text" id={props.id} autocomplete="off" onChange={(e) => props.changeHandler(props.id, e)}></FormInput> 
                : <FormSelect onChange={(e) => props.changeHandler(props.id, e)}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                </FormSelect>
            }
            {props.validationError && props.touched ? <ValidationMessage>{props.validationError}</ValidationMessage> : null}
        </FormElementWrapper>
    )
}

export default FormInputElement
