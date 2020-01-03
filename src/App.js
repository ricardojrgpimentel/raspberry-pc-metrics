import React from 'react';
import Bg from './Bg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

function App() {
  return (
    <Bg>
      <div className="circle-wrap">
        <CircularProgressbar className='graph' value={66} text={`CPU ${66}%`} />
        <CircularProgressbar className='graph' value={66} text={`CPU ${66}%`} />
        <CircularProgressbar className='graph' value={66} text={`CPU ${66}%`} />
        <CircularProgressbar className='graph' value={66} text={`CPU ${66}%`} />
      </div>
    </Bg>
  )
}

export default App;
