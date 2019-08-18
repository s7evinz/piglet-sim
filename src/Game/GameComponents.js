import React from 'react';
import Dice from '../Dice/Dice';
import classNames from 'classnames';

function GameView(props) {
  const { 
    value,
    inProgress,
    gameOver,
    hasWon,
    winSum,
  } = props;
  const winAmount = !hasWon && gameOver ? 0 : winSum;
  const isAdd = value > 1;
  const plusOrMinus = isAdd ? `+${value}` : `-${winSum-1}`;
  const addClassName = classNames({
    'ps-dice-addition': true,
    'is-invisible': !inProgress,
    'has-text-success': isAdd,
    'has-text-danger': !isAdd,
  });

  return (
    <div className="ps-container ps-space-evenly has-text-centered">
      <div>
        <h3 className={addClassName}>{plusOrMinus}</h3>
        <div onClick={props.onRoll}>
          <Dice value={value} />
        </div>
      </div>
      <div>
        <h3 className="is-size-5 has-text-weight-semibold">Winnings</h3>
        <p className="ps-win-amount" style={{color: winAmount ? '#f1c000' : '#A7A7A8'}}>
          ${winAmount}
        </p>
      </div>
    </div>
  );
}

function StreakContainer(props) {
  const {
     history,
     winSum,
     hasWon,
     gameOver,
  } = props;

  const streak = gameOver ? history.length-1 : history.length;
  const showWinnerMsg = classNames({'is-hidden': !hasWon});
  const showLoserMsg = classNames({'is-hidden': !gameOver});
  
  return (
    <div className="ps-streak-container has-text-centered">
      <p className={showWinnerMsg}>
        Congrats! <span roll="img" aria-label="confetti ball">&#x1F38A;</span>&nbsp;
        You've won <span roll="img" aria-label="Money bag">&#x1F4B0;</span>{winSum}
      </p>
      <p className={showLoserMsg}>
        Oh no! <span roll="img" aria-label="see-no-evil monkey">&#x1F648;</span>&nbsp;
        <br/>
        You've lost the potential <span className="has-text-danger">${winSum-1}</span> winnings.
      </p>
      <p>Streak: {streak}</p>
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
  const { gameOver, inProgress, hasWon } = props;

  return (
    <div className="ps-container ps-center ps-action-bar">
      <div className="buttons ps-buttons-box">
          <button className="button is-success" disabled={gameOver || hasWon} onClick={props.onRoll}>
            <span roll="img" aria-label="Dice">&#x1F3B2;</span>&nbsp;Roll
          </button>
          <button className="button is-warning" disabled={gameOver || hasWon || !inProgress} onClick={props.onTakeHome}>
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