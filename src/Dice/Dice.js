// https://create-react-app.dev/docs/importing-a-component
import React from 'react';
// https://create-react-app.dev/docs/adding-images-fonts-and-files
// import { ReactComponent as Dice1 } from './Dice-1.svg';
import d0 from './Dice-0.svg';
import d1 from './Dice-1.svg';
import d2 from './Dice-2-b.svg';
import d3 from './Dice-3-b.svg';
import d4 from './Dice-4.svg';
import d5 from './Dice-5-b.svg';
import d6 from './Dice-6-b.svg';

// TODO: shaky animation
function Dice(props) {
  const size = props.size || 64;
  console.log('size:', size);
  const diceList = [d0, d1, d2, d3, d4, d5, d6];
  const i = props.value;
  return <img src={diceList[i]} alt={`Dice ${i}`} style={{ width: size }} />
}

export default Dice;