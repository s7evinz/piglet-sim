import React from 'react';

function SimResult(props) {
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

export default SimResult;