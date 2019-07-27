import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Input from '../../UI/input/input';

const GameTitle = styled.div`
    width: 100%;
    height: 40px;
    margin: 10px 10px;
    font-size: 25px;
    text-align: center;
    font-weight: bold;
`;

const FormWrapper = styled.div`
    width: 60%;
    margin: auto;
`;

const Button = styled.button`
    background-color: transparent;
    border: 1 px solid #ccc;
    color: black;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    :disabled{
        color:#ccc;
        cursor: not-allowed;
    }
`;

class UserInput extends Component {

    state = {
        playerNameTouched: false,
        gridSizeTouched: false,
        playerNameValid: false,
        gridSizeValid: false,
        validationMessagePlayerName: '',
        validationMessageGridSize: '',
        formValid: false,

        entryPlayerName: '',
        entryPlayerSymbol: 'X',
        entryGridSize: null
    }

    submitHandler = (event) => {
        console.log("submit Handler");
        event.preventDefault();
        this.props.initUserInput(this.state.entryPlayerName, this.state.entryPlayerSymbol, this.state.entryGridSize);
        this.props.history.push("/game");
    }

    validationHandler = (id, event) => {
        console.log("validation handler", id);
        if(id === 'playerName'){
            this.setState({playerNameTouched: true});
            const text = event.target.value.trim();
            if(text.length < 3){
                console.log("text is < 3");
                this.setState({validationMessagePlayerName: 'Player name must contain at least 3 characters!'});
            }else{
                this.setState({playerNameValid: true, validationMessagePlayerName: '', entryPlayerName: text});
            }
        }
        else if (id === 'gridSize'){
            this.setState({gridSizeTouched: true});
            const size = parseInt(event.target.value);
            if(!size || size < 2 || size > 7){
                this.setState({validationMessageGridSize: 'Please enter number between 2 and 7'});
            }else{
                this.setState({gridSizeValid: true, validationMessageGridSize: '', entryGridSize: size});
            }
        }
        else if (id === 'gameSymbol'){
            this.setState({entryPlayerSymbol: event.target.value});
        }
        if(this.state.playerNameValid && this.state.gridSizeValid){
            this.setState({formValid: true});
        }

    }

    render(){
        return <>
            <GameTitle>Tic Tac Toe</GameTitle>
            <FormWrapper>
                <form onSubmit={this.submitHandler}>
                    <Input type={'input'} 
                        labelText={"Player name: "} 
                        id={'playerName'} 
                        changeHandler={this.validationHandler}
                        touched={this.state.playerNameTouched}
                        validationError={this.state.validationMessagePlayerName}
                    />

                    <Input type={'input'} 
                        labelText={"Grid size: "} 
                        id={'gridSize'}
                        changeHandler={this.validationHandler}
                        touched={this.state.gridSizeTouched}
                        validationError={this.state.validationMessageGridSize}
                    />

                    <Input type={'select'} 
                        labelText={"Game symbol: "} 
                        id={'gameSymbol'}
                        changeHandler={this.validationHandler}/>

                    <Button disabled={!this.state.formValid}>Submit</Button>
                </form>
            </FormWrapper>
        </>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initUserInput: (playerName, playerSymbol, n) => dispatch(actions.initUserInput(playerName, playerSymbol, n))
    }
}

export default connect(null, mapDispatchToProps)(UserInput);
