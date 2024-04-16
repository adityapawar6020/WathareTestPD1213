import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UptimeGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Extract timestamps and statuses from data
      const timestamps = data.map(entry => entry.timestamp);
      const statuses = data.map(entry => entry.status);

      // Map status values to colors
      const colors = statuses.map(status => {
        switch (status) {
          case 0:
            return 'red';
          case 1:
            return 'green';
          default:
            return 'yellow';
        }
      });

      // Create the chart
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [{
            label: 'Uptime Status',
            data: statuses,
            borderColor: colors,
            backgroundColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Timestamp'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Uptime Status'
              },
              min: -1,
              max: 2,
              ticks: {
                stepSize: 1,
                callback: value => {
                  switch (value) {
                    case 0:
                      return 'Down';
                    case 1:
                      return 'Up';
                    default:
                      return 'Unknown';
                  }
                }
              }
            }
          }
        }
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default UptimeGraph;