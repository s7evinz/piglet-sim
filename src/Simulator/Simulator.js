import React, { Component } from 'react';
import SimActionBar from './SimActionBar';
import SimForm from './SimForm';
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
        value: '',
      },
      stratB: {
        value: '',
      },
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

  handlePlay = () => {
    console.log('xx this.state:', this.state);
    // this.sim.run();
  }

  handleStop = () => {
    this.sim.stop();
  }

  handleAmountSelect = (e) => {
    this.setState({simAmount: e.target.value});
  }

  handleStratSelect = (e) => {
    this.setState({activeStrat: e.target.value});
  }

  handleStratValChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value: value,
      }
    });
  }

  render() {
    const { 
      simAmount,
      activeStrat,
      stratA,
      stratB,
    } = this.state;
    
    return (
      <div>
        <div className="ps-margin">
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <progress className="progress is-info" value="1" max="100">45%</progress>
            </div>
          </div>
          <SimForm
            simAmount={simAmount}
            activeStrat={activeStrat}
            stratAVal={stratA.value}
            stratBVal={stratB.value}
            onSelectChange={this.handleAmountSelect}
            onRadioChange={this.handleStratSelect}
            onValueChange={this.handleStratValChange}
          />
          {/* {this.renderResult()} */}
        </div>
        <SimActionBar onPlay={this.handlePlay} onStop={this.handleStop} />
      </div>
    );
  }
}

export default Simulator;