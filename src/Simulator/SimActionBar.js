import React from 'react';
import classNames from 'classnames';


function SimActionBar(props) {
  const {
    running,
    completed,
  } = props;

  const stopButton = (
    <button className="button is-danger" onClick={props.onStop} disabled={!running}>
      <span roll="img" aria-label="Stop">&#x23F9;</span>&nbsp;
      Stop
    </button>
  );

  const newButton = (
    <button className="button is-light" onClick={props.onNew}>
      <span roll="img" aria-label="Renew">&#x1F504;</span>&nbsp;
      New
    </button>
  );

  const playPauseClasses = classNames({
    'button': true,
    'is-primary': !running,
    'is-warning': running && !completed,
  });

  return (
    <div className="ps-container ps-center ps-action-bar">
      <div className="buttons ps-buttons-box">
          <button className={playPauseClasses} onClick={props.onPlay} disabled={completed}>
            Run
            &nbsp;<span roll="img" aria-label="Play or pause">&#x23EF;</span>&nbsp;
            Pause
          </button>
          {completed ? newButton : stopButton}
      </div>
    </div>
  );
}

export default SimActionBar;