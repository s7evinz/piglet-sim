// https://create-react-app.dev/docs/importing-a-component
import React, { Component } from 'react';
import classNames from 'classnames';
import Dice from './Dice/Dice';
import './App.css';

function App() {

  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Piglet Sim</h1>
          <h2 className="subtitle">What's the best strategy?</h2>
        </div>
      </section>
      <TabNav />
      <Game />
    </div>
  );
}

function TabNav(props) {
  return (
    <div className="tabs is-centered">
      <ul>
        <li className="is-active"><a>Play</a></li>
        <li><a>Simulate</a></li>
        <li><a>Explanation</a></li>
      </ul>
    </div>
  );
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum and the minimum are inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function sum(listOfNums) {
  const result = listOfNums.reduce((a, b) => a + b, 0);
  return result;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      history: [],
      diceValue: 4,
    };
  }

  isGameOver() {
    const { round, diceValue } = this.state;
    return !round || round > 0 && diceValue === 1;
  }

  rollDice() {
    return getRandomIntInclusive(1, 6);
  }

  handleRoll = () => {
    if (this.isGameOver) {
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

  render() {
    const { history, diceValue } = this.state;

    return (
      <div>
        <GameView history={history} value={diceValue} over={this.isGameOver()} />
        <StreakContainer />
        <PlayActionBar />
      </div>
    );
  }
}

function GameView(props) {
  const { history, value, over } = props;
  const winAmount = sum(history);
  const isAdd = value > 1;
  const addClassName = classNames({
    'ps-dice-addition': true,
    'is-invisible': over,
    'has-text-primary': isAdd,
    'has-text-danger': !isAdd,
  });

  return (
    <div className="ps-container ps-space-evenly has-text-centered">
      <div>
        <h3 className={addClassName}>{(isAdd ? '+' : '-') + `${value}`}</h3>
        <Dice value={value} />
      </div>
      <div>
        <h3 className="is-size-5 has-text-weight-semibold">Winning</h3>
        <p className="ps-win-amount" style={{color: winAmount ? '#f1c000' : '#A7A7A8'}}>
          ${winAmount}
        </p>
      </div>
    </div>
  );
}

function StreakContainer(props) {
  return (
    <div className="ps-streak-container">
      <p className="has-text-centered">Streak: 0</p>
      <div className="ps-sm-dice-container">
        <span className="ps-small-dice">
          <Dice value={3} size={24} />
        </span>
        <span className="ps-small-dice">
          <Dice value={3} size={24} />
        </span>
        <span className="ps-small-dice">
          <Dice value={3} size={24} />
        </span>
      </div>
    </div>
  );
}

function PlayActionBar(props) {
  return (
    <div className="ps-container ps-center ps-action-bar">
      <div className="buttons ps-buttons-box">
          <button className="button is-primary">
            <span roll="img" aria-label="Dice">&#x1F3B2;</span>&nbsp;Roll
          </button>
          <button className="button is-warning">
            <span roll="img" aria-label="Money bag">&#x1F4B0;</span>&nbsp;Take Home
          </button>
          <button className="button is-light">
            <span roll="img" aria-label="Restart">&#x1F504;</span>&nbsp;New
          </button>
      </div>
    </div>
  );
}

export default App;
