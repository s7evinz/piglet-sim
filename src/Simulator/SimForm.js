import React from 'react';

function SimForm(props) {
    const { 
      simAmount,
      activeStrat,
      stratAVal,
      stratBVal,
      onSelectChange,
      onRadioChange,
      onValueChange,
    } = props;
  
  const simAmountOptions = [
    { n: 100, text: '100'},
    { n: 1000, text: '1k'},
    { n: 10000, text: '10k'},
    { n: 100000, text: '100k'},
    { n: 1000000, text: '1 million'},
    { n: 10000000, text: '10 million'},
    { n: 100000000, text: '100 million'},
  ]

  const stratAName = 'stratA';
  const stratBName = 'stratB';
  
  return (
    <form className="ps-sim-form">
      <div className="ps-inline-field ps-strat-field">
        <label className="ps-inline-label">Simulate</label>
        <div className="select">
          <select value={simAmount} onChange={onSelectChange}>
            {simAmountOptions.map((amount, i) => {
              return <option key={i} value={amount.n}>{`${amount.text} times`}</option>
            })}
          </select>
        </div>
      </div>
      <div className="ps-strat-field">
        <div className="ps-inline-field">
          <label className="ps-inline-label">
            <input type="radio" className="ps-strat-radio" onChange={onRadioChange}
              name="Strategy A" value={stratAName} checked={activeStrat === stratAName} />
            Strategy A
          </label>
          <input
            name={stratAName}
            value={stratAVal}
            onChange={onValueChange}
            className="input ps-strat-input"
          />
        </div>
        <p className="ps-strat-desc">Quit after tentative winnings are ${stratAVal} or greater.</p>
      </div>
      <div className="ps-strat-field">
        <div className="ps-inline-field">
          <label className="ps-inline-label">
            <input type="radio" className="ps-strat-radio" onChange={onRadioChange}
              name="Strategy B" value="stratB" checked={activeStrat === 'stratB'} />
            Strategy B
          </label>
          <input
            name={stratBName}
            value={stratBVal}
            onChange={onValueChange}
            className="input ps-strat-input"
          />
        </div>
        <p className="ps-strat-desc">Quit after {stratBVal} successful rolls.</p>
      </div>
    </form>
  );
}

export default SimForm;