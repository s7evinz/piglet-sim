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
      a: StratOnWinnings,
      b: StratOnRollCount,
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
    };
    const strat = new StratOnRollCount(20);
    this.sim = new Sim(10000, strat);
    console.log('xx this.sim:', this.sim);
  }

  renderResult() {
    return (
      <div>
        <div className="ps-container ps-center">
          <table className="table is-striped is-bordered">
            <thead>
              <tr>
                <th className="has-text-info">Result</th>
                <th>Streak</th>
                <th>Winnings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Avg.</th>
                <td>8</td>
                <td>$20</td>
              </tr>
              <tr>
                <th>Best</th>
                <td>19</td>
                <td>$99</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <h3 className="is-size-5 has-text-weight-semibold">Chosen Strategy</h3>
        <p>Quit after tentative winnings are $n or greater.</p>
      </div>
    );
  }

  handlePlayPause = () => {
    const { paused } = this.state;
    this.setState({
      running: true,
      paused: !paused,
    })
    // this.sim.run();
    setTimeout(() => {
      this.setState({
        completed: true
      });
    }, 1000);
  }

  _setNewSim() {
    this.setState({
      running: false,
      paused: false,
      completed: false,
    });
  }

  handleStop = () => {
    this._setNewSim();
    // this.sim.stop();
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
          <SimProgress />
          {(running || paused || completed)
            ? simResult
            : simForm
          }
        </div>
        <SimActionBar
          running={running}
          paused={paused}
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
        <progress className="progress is-info" value="1" max="100">45%</progress>
      </div>
    </div>
  );
}

export default Simulator;