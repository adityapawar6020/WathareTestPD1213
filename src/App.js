import React from 'react';
import SampleChart from './SampleChart';
import sampleData from './sample-data.json'

const App = () => {
  return (
    <div>
      <h1>Sample Chart</h1>
      <SampleChart data={sampleData} />
    </div>
  );
};

export default App;