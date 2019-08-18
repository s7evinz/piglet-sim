import React from 'react';
import classNames from 'classnames';

function SimActionBar(props) {
  const { gameOver, inProgress, hasWon } = props;

  return (
    <div className="ps-container ps-center ps-action-bar">
      <div className="buttons ps-buttons-box">
          <button className="button is-primary" onClick={props.onPlay}>
            Run
            &nbsp;<span roll="img" aria-label="Play or pause">&#x23EF;</span>&nbsp;
            Pause
          </button>
          <button className="button is-light" onClick={props.onStop}>
            <span roll="img" aria-label="Stop">&#x23F9;</span>&nbsp;
            Stop
          </button>
      </div>
    </div>
  );
}

export default SimActionBar;