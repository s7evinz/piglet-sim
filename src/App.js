// https://create-react-app.dev/docs/importing-a-component
import React, { Component } from 'react';
import Game from './Game/Game';
import './App.css';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
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
        page = <p>Simulator</p>;
        break;
      case 2:
        page = <p>Explanation</p>;
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
      'Leaderboard',
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
