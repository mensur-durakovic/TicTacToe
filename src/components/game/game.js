import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Grid from "./grid/grid";
import GridLogger from "./logger/logger";
import InfoProvider from "./InfoProvider/infoProvider";
import Restarter from "./restarter/restarter";

const GameWrapper = styled.div`
  padding: 0px 20px;
`;

class Game extends Component {
  componentDidMount() {
    this.props.initGrid();
  }

  redirectToMainMenu = () => {
    this.props.history.push("/");
  };

  render() {

    let gridResult;
    if (this.props.grid && this.props.grid.length > 1) {
      gridResult = (
        <Grid
          grid={this.props.grid}
          fillSquare={this.props.fillSquare}
          n={this.props.n}
          gameStarted={this.props.gameStarted}
          gameOver={this.props.gameOver}
        />
      );
    } else {
      gridResult = <div />;
    }
    return (
      <GameWrapper>
        <InfoProvider
          playerName={this.props.playerName}
          playerWins={this.props.playerWins}
          computerWins={this.props.computerWins}
        />

        {gridResult}

        {this.props.gameOver ? (
          <Restarter
            restartGame={this.props.initGrid}
            toMainMenu={this.redirectToMainMenu}
          />
        ) : null}
        <GridLogger logs={this.props.logs} />
      </GameWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    n: state.n,
    grid: state.grid,
    playerName: state.playerName,
    playerSymbol: state.playerSymbol,
    computerSymbol: state.computerSymbol,
    logs: state.logs,
    playerWins: state.playerWins,
    computerWins: state.computerWins,
    gameStarted: state.gameStarted,
    gameOver: state.gameOver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGrid: () => dispatch(actions.initGrid()),
    fillSquare: (row, column) => dispatch(actions.fillSquare(row, column))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
