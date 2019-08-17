import React, { Component } from 'react';
import { getRandomIntInclusive } from '../common';
import { GameView, StreakContainer, PlayActionBar } from './GameComponents';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      history: [],
      diceValue: 4,
    };
  }

  newGame() {
    this.setState({
      round: 0,
      history: [],
      diceValue: 4,
    })
  }

  isGameOver() {
    const { round, diceValue } = this.state;
    return round > 0 && diceValue === 1;
  }

  inProgress() {
    const { round } = this.state;
    return round > 0;
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

  }

  render() {
    const { history, diceValue } = this.state;
    const gameOver = this.isGameOver();
    const inProgress = this.inProgress();

    return (
      <div>
        <GameView
          history={history}
          value={diceValue}
          inProgress={inProgress}
          gameOver={gameOver}
        />
        <StreakContainer history={history} />
        <PlayActionBar
          gameOver={gameOver}
          inProgress={inProgress}
          onRoll={this.handleRoll}
          onNew={this.handleNew}
         />
      </div>
    );
  }
}

export default Game;