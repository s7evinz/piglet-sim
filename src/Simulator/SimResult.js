import React from 'react';

function SimResult(props) {
  const {
    activeStrat,
    stratValue,
    completed,
    avgStreak,
    avgWinnings,
    bestStreak,
    bestWinnings,
  } = props;

  let roundedAvgStreak;
  let roundedAvgWinnings;
  if (completed) {
    roundedAvgStreak = avgStreak.toFixed(2);
    roundedAvgWinnings = avgWinnings.toFixed(2);
  }

  const chosenStrats = {
    stratA: <p>Quit after tentative winnings are ${stratValue} or greater.</p>,
    stratB: <p>Quit after {stratValue} successful rolls.</p>,
  }

  return (
    <div>
      <div className="ps-container ps-center">
        <table className="table is-bordered">
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
              <td>{roundedAvgStreak}</td>
              <td>${roundedAvgWinnings}</td>
            </tr>
            <tr>
              <th>Best</th>
              <td>{bestStreak}</td>
              <td>${bestWinnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <h3 className="is-size-5 has-text-weight-semibold">Chosen Strategy</h3>
      {chosenStrats[activeStrat]}
    </div>
  );
}

export default SimResult;