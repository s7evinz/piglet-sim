import React, { Component } from 'react';
import { getRandomIntInclusive, sum } from '../common';
import { GameView, StreakContainer, PlayActionBar } from './GameComponents';
import './Game.css';

const cleanState = {
  round: 0,
  history: [],
  diceValue: 4,
  takeHome: false,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = cleanState;
  }

  newGame() {
    this.setState(cleanState);
  }

  isGameOver() {
    const { round, diceValue } = this.state;
    return round > 0 && diceValue === 1;
  }

  inProgress() {
    const { round } = this.state;
    return round > 0;
  }

  hasWon() {
    return this.state.takeHome;
  }

  rollDice() {
    return getRandomIntInclusive(1, 6);
  }

  handleRoll = () => {
    if (this.isGameOver()) {
      console.info('The game is over! Please start over.')
      return;
    }

    const diceValue = this.rollDice();
    const history = this.state.history.concat([diceValue]);
    this.setState({
      round: this.state.round + 1,
      history: history,
      diceValue: diceValue,
    });
  }

  handleNew = () => {
    this.newGame();
  }

  handleTakeHome = () => {
    this.setState({
      takeHome: true,
    });
  }

  render() {
    const { 
      history,
      diceValue,
    } = this.state;
    const gameOver = this.isGameOver();
    const inProgress = this.inProgress();
    const hasWon = this.hasWon();
    const winSum = sum(history);

    return (
      <div>
        <GameView
          onRoll={this.handleRoll}
          value={diceValue}
          inProgress={inProgress}
          hasWon={hasWon}
          gameOver={gameOver}
          winSum={winSum}
        />
        <StreakContainer
          winSum={winSum}
          hasWon={hasWon}
          gameOver={gameOver}
          history={history}
        />
        <PlayActionBar
          gameOver={gameOver}
          inProgress={inProgress}
          hasWon={hasWon}
          onRoll={this.handleRoll}
          onTakeHome={this.handleTakeHome}
          onNew={this.handleNew}
         />
         <div className="ps-action-bar-padding"></div>
      </div>
    );
  }
}

export default Game;