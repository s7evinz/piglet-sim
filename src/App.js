// https://create-react-app.dev/docs/importing-a-component
import React, { Component } from 'react';
import Game from './Game/Game';
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


export default App;
