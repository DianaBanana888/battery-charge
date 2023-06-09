import './App.css';
// import Abba from '../src/view/Abba'
// import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { CallAPI } from './controller/callAPI';
import Abba from './view/Abba';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    setData(CallAPI)
  }, []);

  return (
    <div className="App">
      {!data && <p>Loading data. Wait please</p>}
      {data && typeof (data) === 'string' && <p>Something went wrong</p>}
      {data && typeof (data) !== 'string' && data.length &&
        <Abba props={data} />}
    </div>
  );
}

export default App;
