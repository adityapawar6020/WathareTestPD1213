import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import sampleData from './sample-data.json';

const SampleChart = () => {
  const chartContainer = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState(sampleData);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = chartContainer.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); 
      }

      const timestamps = data.map(sample => sample.ts);
      const machineStatus = data.map(sample => sample.machine_status);
      const vibration = data.map(sample => sample.vibration);
      const colors = data.map(sample => {
        if (sample.machine_status === 0) return 'yellow';
        else if (sample.machine_status === 1) return 'green';
        else return 'red';
      });

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [{
            label: 'Machine Status',
            data: machineStatus,
            borderColor: colors,
            borderWidth: 1
          }, {
            label: 'Vibration',
            data: vibration,
            borderColor: 'blue', // Adjust color as needed
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'YYYY-MM-DDTHH:mm:ss',
                unit: 'second'
              }
            }
          }
        }
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default SampleChart;
