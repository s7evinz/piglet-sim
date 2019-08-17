import React from 'react';
import Dice from '../Dice/Dice';
import classNames from 'classnames';
import { sum } from '../common';

function GameView(props) {
  const { history, value, inProgress, gameOver } = props;
  const winSum = sum(history);
  const winAmount = gameOver ? 0 : winSum;
  const isAdd = value > 1;
  const plusOrMinus = isAdd ? `+${value}` : `-${winSum}`;
  const addClassName = classNames({
    'ps-dice-addition': true,
    'is-invisible': !inProgress,
    'has-text-primary': isAdd,
    'has-text-danger': !isAdd,
  });

  return (
    <div className="ps-container ps-space-evenly has-text-centered">
      <div>
        <h3 className={addClassName}>{plusOrMinus}</h3>
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
  const { history } = props;
  
  return (
    <div className="ps-streak-container">
      <p className="has-text-centered">Streak: {history.length}</p>
      <div className="ps-sm-dice-container">
        {history.map((val, i) => {
          return (
            <span key={i} className="ps-small-dice">
              <Dice value={val} size={24} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

function PlayActionBar(props) {
  const { gameOver, inProgress } = props;

  return (
    <div className="ps-container ps-center ps-action-bar">
      <div className="buttons ps-buttons-box">
          <button className="button is-primary" disabled={gameOver} onClick={props.onRoll}>
            <span roll="img" aria-label="Dice">&#x1F3B2;</span>&nbsp;Roll
          </button>
          <button className="button is-warning" disabled={gameOver}>
            <span roll="img" aria-label="Money bag">&#x1F4B0;</span>&nbsp;Take Home
          </button>
          <button className="button is-light" disabled={!inProgress} onClick={props.onNew}>
            <span roll="img" aria-label="Restart">&#x1F504;</span>&nbsp;New
          </button>
      </div>
    </div>
  );
}

export {
  GameView,
  StreakContainer,
  PlayActionBar
};