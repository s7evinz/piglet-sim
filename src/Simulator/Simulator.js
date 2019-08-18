import React, { Component } from 'react';
import './Simulator.css';

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForm() {
    const simAmount = [
      { n: 100, text: '100'},
      { n: 1000, text: '1k'},
      { n: 10000, text: '10k'},
      { n: 100000, text: '100k'},
      { n: 1000000, text: '1 million'},
      { n: 10000000, text: '10 million'},
      { n: 100000000, text: '100 million'},
    ]
    
    return (
      <form onSubmit={this.handleSubmit} className="ps-sim-form">
        <div className="ps-inline-field ps-strat-field">
          <label className="ps-inline-label">Simulate</label>
          <div className="select">
            <select>
              {simAmount.map((amount, i) => {
                return <option key={i}>{`${amount.text} times`}</option>
              })}
            </select>
          </div>
        </div>
        <div className="ps-strat-field">
          <div className="ps-inline-field">
            <input type="radio" className="ps-strat-radio" name="A" />
            <label className="ps-inline-label">
              Strategy A
            </label>
            <input type="number" className="input ps-strat-input" placeholder="10" min="1" />
          </div>
          <p className="ps-strat-desc">Quit after tentative winnings are $n or greater.</p>
        </div>
        <div className="ps-strat-field">
          <div className="ps-inline-field">
            <input type="radio" className="ps-strat-radio" name="B" />
            <label className="ps-inline-label">
              Strategy B
            </label>
            <input type="number" className="input ps-strat-input" placeholder="5" min="1" />
          </div>
          <p className="ps-strat-desc">Quit after n successful rolls.</p>
        </div>
      </form>
    );
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

  render() {
    return (
      <div className="ps-margin">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <progress className="progress is-info" value="1" max="100">45%</progress>
          </div>
        </div>
        {/* {this.renderForm()} */}
        {this.renderResult()}
      </div>
    );
  }
}

export default Simulator;