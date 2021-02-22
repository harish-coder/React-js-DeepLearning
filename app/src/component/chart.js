import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }


const BarChart = (probs) => {
    const dataset= {
        labels: probs.chartList.names,
        datasets: [
          {
            label: '# of votes',
            data: probs.chartList.scores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(180, 159, 64, 0.2)',
              'rgba(180, 100, 64, 0.2)',
              'rgba(180, 159, 60, 0.2)',
              'rgba(180, 96, 64, 0.2)',
              
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(180, 159, 64, 1)',
              'rgba(180, 100, 64, 1)',
              'rgba(180, 159, 60, 1)',
              'rgba(180, 96, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
  return ( 
    <div>
      <Bar
        data={dataset}
        height={400}
        width={600}
        options={options}
      />
    </div>
  )
}

export default BarChart