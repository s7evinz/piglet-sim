// https://create-react-app.dev/docs/importing-a-component
import React from 'react';
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
      <PlayTab />
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

function PlayTab(props) {
  return (
    <div>
      <GameStatus />
      <StreakContainer />
      <PlayActionBar />
    </div>
  );
}

function GameStatus(props) {
  return (
    <div className="ps-container ps-space-evenly has-text-centered">
      <div>
        <h3 className="ps-dice-addition has-text-primary">+6</h3>
        <Dice value={0} />
      </div>
      <div>
        <h3 className="is-size-5">Winning</h3>
        <p className="ps-win-amount">$11</p>
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
          <span className="button is-primary">🎲 Roll</span>
          <span className="button is-warning">💰 Take Home</span>
          <span className="button is-light">🔄 New</span>
      </div>
    </div>
  );
}

export default App;
