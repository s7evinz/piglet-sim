// https://create-react-app.dev/docs/importing-a-component
import React, { Component } from 'react';
import Game from './Game/Game';
import Simulator from './Simulator/Simulator';
import './App.css';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
    };
  }

  handleTabClick = (tabIndex) => {
    this.setState({
      tabIndex: tabIndex
    });
  }

  renderTabPage() {
    let page;
    const { tabIndex } = this.state;
    switch (tabIndex) {
      case 1:
        page = <Simulator />;
        break;
      case 2:
        page = <Explain />;
        break;
      case 3:
        page = <p>Coming soon.</p>;
        break;
      default:
        page = <Game />;
    }
    return page;
  }

  render() {
    const { 
      tabIndex,
    } = this.state;
    
    const tabs = [
      'Play',
      'Simulate',
      'Explain',
      // 'Leaderboard', // would be too easy to hack
    ];

    return (
      <div className="App">
        <section className="section">
          <div className="container">
            <h1 className="title">Piglet Sim</h1>
            <h2 className="subtitle">What's the best strategy?</h2>
          </div>
        </section>
        <TabNav
          tabs={tabs}
          activeIndex={tabIndex}
          onTabClick={this.handleTabClick}
         />
         {this.renderTabPage()}
      </div>
    );
  }
}

function Explain(props) {
  return (
    <div className="ps-margin">
      <div className="columns">
        <div className="column content">
          <h3>Game Rules</h3>
          <p>You start with no money in the money bag, and on every turn you have two choices: quit and take home your winnings, or risk everything in the money bag and roll a die.</p>
          <p>If the die lands on 1, you lose all the money in your money bag, but if the die lands on anything else, you add the value in dollars to your money bag..</p>
          <h3>Strategy</h3>
          <p>What would be the optimal strategy for making the most money on average?</p>
        </div>
      </div>
    </div>
  );
}

function TabNav(props) {
  const {
    tabs,
    activeIndex,
  } = props;
  
  return (
    <div className="tabs is-centered">
      <ul>
        {tabs.map((name, i) => {
          const isActive = classNames({'is-active': i === activeIndex});
          return (
            <li key={i} className={isActive} onClick={props.onTabClick.bind(this, i)}>
              <a>{name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


export default App;
