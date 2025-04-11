import NumericalTest from "./numericalTest";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Question {
  text: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  chartData: any;
}

const questionsDatabase: Question[] = [
  {
    text: "Sales Data Analysis",
    question: "Based on the chart, what was the percentage increase in sales from Q1 to Q2?",
    options: ["15%", "20%", "25%", "30%"],
    correctAnswer: 2,
    timeLimit: 90,
    chartData: {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Sales (in $1000)',
          data: [40, 50, 35, 60],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($1000)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Quarter'
            }
          }
        }
      }
    }
  },
  {
    text: "Population Growth Trends",
    question: "What is the average annual population growth over the 5-year period?",
    options: ["1.2 million", "1.5 million", "1.8 million", "2.1 million"],
    correctAnswer: 1,
    timeLimit: 120,
    chartData: {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Population (millions)',
          data: [10.2, 11.6, 13.2, 14.8, 16.2],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Population (millions)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      }
    }
  },
  {
    text: "Expense Distribution",
    question: "What percentage of the total expenses is spent on Housing?",
    options: ["20%", "30%", "35%", "40%"],
    correctAnswer: 3,
    timeLimit: 60,
    chartData: {
      type: 'pie',
      data: {
        labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities'],
        datasets: [{
          label: 'Monthly Expenses',
          data: [40, 25, 15, 10, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Expense Distribution'
          }
        }
      }
    }
  },
  {
    text: "Investment Returns",
    question: "If you invested $5000 in Year 1, what would be the value of your investment in Year 5?",
    options: ["$6,802", "$7,442", "$8,144", "$9,155"],
    correctAnswer: 2,
    timeLimit: 120,
    chartData: {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
          label: 'Annual Return Rate (%)',
          data: [8, 12, 10, 15, 7],
          fill: false,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Return Rate (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      }
    }
  },
  {
    text: "Comparative Market Analysis",
    question: "Which company showed the highest revenue growth from 2021 to 2022?",
    options: ["Company A", "Company B", "Company C", "Company D"],
    correctAnswer: 1,
    timeLimit: 90,
    chartData: {
      type: 'bar',
      data: {
        labels: ['Company A', 'Company B', 'Company C', 'Company D'],
        datasets: [
          {
            label: '2021 Revenue ($ million)',
            data: [45, 30, 60, 25],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: '2022 Revenue ($ million)',
            data: [52, 48, 65, 30],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($ million)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Company'
            }
          }
        }
      }
    }
  }
];

const numQuestions = 5;

function getRandomQuestions(database: Question[], count: number): Question[] {
  const shuffled = [...database].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const questions: Question[] = getRandomQuestions(questionsDatabase, numQuestions);

export default function Numerical() {
  return (
    <NumericalTest questions={questions} />
  );
}

