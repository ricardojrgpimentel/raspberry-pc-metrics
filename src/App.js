import React from 'react';
import Background from './components/background/Background'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './App.css'

function App() {
  return (
    <Background>
      <div className="columns is-mobile">
        <CircularProgressbar className='column graph' value={66} text={`CPU ${66}%`} />
        <CircularProgressbar className='column graph' value={66} text={`RAM ${20}%`} />
        <CircularProgressbar className='column graph' value={66} text={`GPU ${60}%`} />
        <CircularProgressbar className='column graph' value={66} text={`SSD ${3}%`} />
      </div>
    </Background>
  )
}

export default App;
