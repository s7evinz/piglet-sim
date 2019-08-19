import React, { Component } from 'react';
import SimActionBar from './SimActionBar';
import SimForm from './SimForm';
import SimResult from './SimResult';
import Sim, { StratOnRollCount, StratOnWinnings } from './Sim';
import './Simulator.css';

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.strategyOptions = {
      stratA: StratOnWinnings,
      stratB: StratOnRollCount,
    }
    this.state = {
      simAmount: 100,
      activeStrat: 'stratA',
      stratA: {
        value: 10,
      },
      stratB: {
        value: 5,
      },
      running: false,
      paused: false,
      completed: false,
      progressValue: 0,
      // bestWinnings: 0,
      // bestStreak: 0,
      // avgWinnings: 0,
      // avgStreak: 0,
    };
  }

  onSimUpdate = (counter, best, avg, completed) => {
    const { simAmount } = this.state;
    const progressValue = (counter / simAmount) * 100;
    this.setState({
      progressValue: progressValue,
      bestStreak: best.streak,
      bestWinnings: best.winnings,
    });
    if (completed) {
      this.setState({
        avgStreak: avg.streak,
        avgWinnings: avg.winnings,
        running: false,
        completed: true,
      });
    }
  }

  handlePlayPause = () => {
    // setup simulation for the first time Play is clicked
    if (!this.simulation) {
      const { activeStrat, simAmount } = this.state;
      const chosenStrategy = this.strategyOptions[activeStrat];
      const strategy = new chosenStrategy(this.state[activeStrat].value);
      this.simulation = new Sim(simAmount, strategy, this.onSimUpdate);
    }

    const { running } = this.state;
    if (!running) {
      this.simulation.run();
      this.setState({
        running: true,
        paused: false,
      });
    } else {
      this.simulation.pause();
      this.setState({
        running: false,
        paused: true,
      });
    }
  }

  _setNewSim() {
    this.simulation = null;
    this.setState({
      running: false,
      paused: false,
      completed: false,
      progressValue: 0,
    });
  }

  handleStop = () => {
    if (!this.simulation) {
      // "Stop" is disabled if there's no simulation
      // aka !this.state.running
      return;
    }
    this.simulation.stop();
    this._setNewSim();
  }

  handleNew = () => {
    this._setNewSim();
  }

  handleAmountSelect = (e) => {
    this.setState({simAmount: e.target.value});
  }

  handleStratSelect = (e) => {
    this.setState({activeStrat: e.target.value});
  }

  handleStratValChange = (e) => {
    const { name, value } = e.target;
    const n = Math.floor(Math.abs(value));
    this.setState({
      [name]: {
        value: n,
      }
    });
  }

  render() {
    const { 
      simAmount,
      activeStrat,
      stratA,
      stratB,
      running,
      paused,
      completed,
      progressValue,
    } = this.state;

    const simForm = (
      <SimForm
        simAmount={simAmount}
        activeStrat={activeStrat}
        stratAVal={stratA.value}
        stratBVal={stratB.value}
        onSelectChange={this.handleAmountSelect}
        onRadioChange={this.handleStratSelect}
        onValueChange={this.handleStratValChange}
      />
    );

    const simResult = (
      <SimResult
      />
    );
    
    return (
      <div>
        <div className="ps-margin">
          <SimProgress value={progressValue} />
          {(running || paused || completed)
            ? simResult
            : simForm}
        </div>
        <SimActionBar
          running={running}
          completed={completed}
          onPlay={this.handlePlayPause}
          onStop={this.handleStop}
          onNew={this.handleNew}
         />
        <div className="ps-action-bar-padding"></div>
      </div>
    );
  }
}

function SimProgress(props) {
  return (
    <div className="columns is-centered">
      <div className="column is-two-thirds">
        <progress className="progress is-info" value={props.value} max="100">45%</progress>
      </div>
    </div>
  );
}

export default Simulator;