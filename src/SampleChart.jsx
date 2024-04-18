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
      const colors = machineStatus.map(status => (status === 0 ? 'yellow' : 'green'));

      const fixedHeight = 50; 
      const lineData = Array.from({ length: machineStatus.length }, () => fixedHeight);

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: timestamps,
          datasets: [{
            label: 'Machine Status',
            data: lineData,
            backgroundColor: colors,
            borderWidth: 0,
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
            },
            y: {
              min: 40, 
              max: 60, 
              ticks: {
                stepSize: 10 
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
