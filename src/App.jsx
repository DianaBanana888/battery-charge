import './App.css';
import React, { useState, useEffect } from 'react';
import { CallAPI } from './controller/callAPI';
import SchoolBatteryInformation from './view/SchoolBatteryInformation';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await CallAPI;
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {!data && <p>Loading data. Wait please</p>}
      {data && typeof (data) === 'string' && <p>Something went wrong</p>}
      {data && typeof (data) !== 'string' && data.length &&
        <SchoolBatteryInformation props={data} />}
    </div>
  );
}

export default App;
