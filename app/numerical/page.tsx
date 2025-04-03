import { label } from "framer-motion/client";
import NumericalTest from "./numericalTest";

interface Question {
  text: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  chartData: any;
}

const numQuestions: number = 5;

const questionsDatabase: Question[] = [
    {
      text: "Sales Performance Comparison",
      question: "What was the percentage increase in Q4 sales from 2021 to 2023?",
      options: ["29%", "37%", "43%", "51%"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['2021', '2022', '2023'],
        datasets: [{
          label: 'Q4 Sales (million €)',
          data: [3.8, 4.5, 5.2],
          backgroundColor: '#3b82f6',
          datalabels: {
            anchor: 'end',
            align: 'top'
          }
        }]
      }
    },
    {
        text: "Monthly Revenue vs Expenses",
        question: "In which month was the profit margin highest?",
        options: ["January", "March", "June", "August"],
        correctAnswer: 1,
        timeLimit: 120,
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue (k€)',
              data: [75, 82, 88, 79, 85, 90],
              borderColor: '#10b981',
              type: 'line',
              datalabels: {
                anchor: 'center',
                align: 'bottom',
                offset: 8,
                color: '#10b981',
                font: {
                  weight: 'bold',
                  size: 12
                }
              }
            },
            {
              label: 'Expenses (k€)',
              type: 'bar',
              data: [48, 52, 45, 55, 60, 58],
              backgroundColor: '#f59e0b',
              datalabels: {
                anchor: 'end',
                align: 'top',
                offset: -10,
                color: '#7c2d12',
                font: {
                  weight: 'bold',
                  size: 12
                }
              }
            }
          ]
        }
      },      
    {
      text: "Market Share Distribution",
      question: "What is the ratio of the largest market segment to the smallest?",
      options: ["3:1", "19:5", "5:2", "4:1"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        datasets: [{
          label: 'Market Share %',
          data: [22, 18, 38, 10, 12],
          backgroundColor: ['#ef4444', '#f59e0b', '#84cc16', '#3b82f6', '#8b5cf6'],
          datalabels: {
            anchor: 'end',
            align: 'top'
          }
        }]
      }
    },
    {
      text: "Projected Growth Rates",
      question: "What is the average annual growth rate across all years?",
      options: ["9%", "10%", "11%", "12%"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['Year 1', 'Year 2', 'Year 3'],
        datasets: [{
          label: 'Growth Rate %',
          data: [8, 12, 10],
          backgroundColor: '#8b5cf6',
          datalabels: {
            anchor: 'end',
            align: 'top'
          }
        }]
      }
    },
    {
      text: "Advertising Cost Analysis",
      question: "Which quarter had the lowest cost per conversion?",
      options: ["Q1", "Q2", "Q3", "Q4"],
      correctAnswer: 3,
      timeLimit: 120,
      chartData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Ad Spend (€)',
            data: [18000, 22000, 24500, 28000],
            backgroundColor: '#3b82f6',
            datalabels: {
              anchor: 'end',
              align: 'top'
            }
          },
          {
            label: 'Conversions',
            data: [150, 180, 210, 260],
            backgroundColor: '#10b981',
            datalabels: {
              anchor: 'end',
              align: 'top'
            }
          }
        ]
      }
    },
    {
      text: "Customer Satisfaction Trends",
      question: "Which quarter showed the highest year-over-year improvement in satisfaction?",
      options: ["Q2 2022", "Q3 2022", "Q1 2023", "Q2 2023"],
      correctAnswer: 2,
      timeLimit: 120,
      chartData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: '2022',
            data: [78, 82, 85, 84],
            borderColor: '#3b82f6',
            type: 'line'
          },
          {
            label: '2023',
            data: [83, 87, 89, 88],
            borderColor: '#10b981',
            type: 'line'
          }
        ]
      }
    },
    {
      text: "Product Launch Performance",
      question: "What percentage of total sales came from Product B in its launch quarter?",
      options: ["18%", "22%", "25%", "28%"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['Product A', 'Product B', 'Product C'],
        datasets: [{
          label: 'Total Sales',
          data: [120000, 85000, 95000],
          backgroundColor: ['#3b82f6', '#f59e0b', '#84cc16']
        }]
      }
    },
    {
      text: "Employee Productivity Metrics",
      question: "How many more tasks did Team A complete compared to Team B in Week 3?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 0,
      timeLimit: 120,
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Team A',
            data: [45, 52, 60, 58],
            backgroundColor: '#3b82f6'
          },
          {
            label: 'Team B',
            data: [40, 48, 45, 50],
            backgroundColor: '#f59e0b'
          }
        ]
      }
    },
    {
      text: "Website Traffic Sources",
      question: "What is the approximate ratio of organic to paid traffic?",
      options: ["2:1", "3:1", "4:1", "5:1"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['Direct', 'Organic', 'Paid', 'Social', 'Email'],
        datasets: [{
          label: 'Web Traffic',
          data: [15, 45, 15, 10, 15],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
        }]
      }
    },
    {
      text: "Regional Sales Distribution",
      question: "Which region accounted for about one-third of total sales?",
      options: ["North", "South", "East", "West"],
      correctAnswer: 3,
      timeLimit: 120,
      chartData: {
        labels: ['North', 'South', 'East', 'West'],
        datasets: [{
          label: "Total Sales",
          data: [25, 20, 25, 30],
          backgroundColor: ['#3b82f6', '#f59e0b', '#84cc16', '#8b5cf6']
        }]
      }
    },
    {
      text: "Annual Subscription Growth",
      question: "What was the percentage growth in subscriptions from 2020 to 2022?",
      options: ["120%", "140%", "160%", "180%"],
      correctAnswer: 2,
      timeLimit: 120,
      chartData: {
        labels: ['2020', '2021', '2022'],
        datasets: [{
          label: 'Subscriptions (thousands)',
          data: [25, 45, 65],
          backgroundColor: '#3b82f6'
        }]
      }
    },
    {
      text: "Inventory Turnover Rates",
      question: "Which product category has the fastest inventory turnover?",
      options: ["Electronics", "Apparel", "Home Goods", "Grocery"],
      correctAnswer: 3,
      timeLimit: 120,
      chartData: {
        labels: ['Electronics', 'Apparel', 'Home Goods', 'Grocery'],
        datasets: [{
          label: 'Turnover (times/year)',
          data: [4, 6, 5, 12],
          backgroundColor: ['#3b82f6', '#f59e0b', '#84cc16', '#10b981']
        }]
      }
    },
    {
      text: "Project Timeline Comparison",
      question: "How many days was Project A ahead of schedule at completion?",
      options: ["5", "7", "10", "12"],
      correctAnswer: 1,
      timeLimit: 120,
      chartData: {
        labels: ['Planned', 'Actual'],
        datasets: [
          {
            label: 'Project A',
            data: [90, 83],
            backgroundColor: '#3b82f6'
          },
          {
            label: 'Project B',
            data: [75, 80],
            backgroundColor: '#f59e0b'
          }
        ]
      }
    },
    {
      text: "Energy Consumption Breakdown",
      question: "What percentage of total energy is consumed by cooling systems?",
      options: ["22%", "25%", "28%", "32%"],
      correctAnswer: 0,
      timeLimit: 120,
      chartData: {
        labels: ['Lighting', 'HVAC', 'Cooling', 'Equipment', 'Other'],
        datasets: [{
          label: "Total Energy",
          data: [25, 30, 22, 15, 8],
          backgroundColor: ['#3b82f6', '#f59e0b', '#84cc16', '#8b5cf6', '#ec4899']
        }]
      }
    },
    {
      text: "Customer Age Demographics",
      question: "Which age group represents approximately 40% of customers?",
      options: ["18-25", "26-35", "36-45", "46-55"],
      correctAnswer: 2,
      timeLimit: 120,
      chartData: {
        labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
        datasets: [{
          label: "Age Group",
          data: [15, 30, 40, 10, 5],
          backgroundColor: ['#3b82f6', '#f59e0b', '#84cc16', '#8b5cf6', '#ec4899']
        }]
      }
    }
  ];

function getRandomQuestions(database: Question [], count: number) : Question []
{
  const shuffled = [...database].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
  
const questions : Question [] = getRandomQuestions(questionsDatabase, numQuestions)

export default function Numerical()
{
  return(
    <NumericalTest questions={questions} />
  )
}

