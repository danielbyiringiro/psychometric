"use client"

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  LineController,
  PointElement, 
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ChartDataLabels, 
  LineController,
  PointElement, 
  LineElement,
  ArcElement
);

interface Question 
{
    text: string;
    question: string;
    options: string[];
    correctAnswer: number;
    timeLimit: number;
    chartData: any;
}

// Chart component to handle different chart types
const ChartComponent = ({ chartData }: { chartData: any }) => {
  const { type, data, options } = chartData;
  
  switch (type) {
    case 'line':
      return <Line data={data} options={options} />;
    case 'bar':
      return <Bar data={data} options={options} />;
    case 'pie':
      return <Pie data={data} options={options} />;
    case 'doughnut':
      return <Doughnut data={data} options={options} />;
    default:
      return <Bar data={data} options={options} />;
  }
};

export default function NumericalTest({questions}: {questions: Question[]}) {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(questions[currentQuestion].timeLimit);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [currentQuestion]);
  
    useEffect(() => {
      if (timeLeft === 0) handleNextQuestion();
    }, [timeLeft]);
  
    const handleAnswer = (answer: number) => {
      setAnswers([...answers, answer]);
      handleNextQuestion();
    };
  
    const calculateScore = () => {
      return answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
    };
  
    const getResultMessage = (score: number) => {
      const percentage = (score / questions.length) * 100;
      if (percentage >= 90) return { message: "Outstanding! 🎉", color: "bg-gradient-to-r from-green-400 to-blue-500" };
      if (percentage >= 70) return { message: "Well Done! 👍", color: "bg-gradient-to-r from-yellow-400 to-orange-500" };
      return { message: "Keep Practicing! 💪", color: "bg-gradient-to-r from-red-400 to-pink-500" };
    };
  
    const handleNextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(questions[currentQuestion + 1].timeLimit);
      } else {
        setShowResults(true);
      }
    };
  
    const getAnswerAnalysis = () => {
      return questions.map((question, index) => ({
        questionNumber: index + 1,
        correct: answers[index] === question.correctAnswer,
        userAnswer: question.options[answers[index]],
        correctAnswer: question.options[question.correctAnswer],
      }));
    };
  
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 relative">
          <div className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full">
            Time left: {timeLeft} seconds
          </div>
  
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Data Visualization</h3>
            <div className="w-full h-64">
              <ChartComponent chartData={questions[currentQuestion].chartData} />
            </div>
          </div>
  
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Question</h3>
            <p className="text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="p-4 text-center bg-gray-50 hover:bg-green-50 border border-gray-200 rounded-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-xl my-8 relative max-h-[90vh] overflow-y-auto">
              <div className={`text-center p-8 rounded-xl ${getResultMessage(calculateScore()).color} text-white`}>
                <h2 className="text-4xl font-bold mb-4">{getResultMessage(calculateScore()).message}</h2>
                <div className="flex justify-center items-center space-x-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="8"
                        strokeDasharray={`${(calculateScore() / questions.length) * 251} 251`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{calculateScore()}/{questions.length}</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-semibold">Detailed Analysis</h3>
                {getAnswerAnalysis().map((analysis, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Question {analysis.questionNumber}</span>
                      {analysis.correct ? (
                        <span className="text-green-500">✓ Correct</span>
                      ) : (
                        <span className="text-red-500">✗ Incorrect</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Your answer: {analysis.userAnswer}</p>
                    {!analysis.correct && (
                      <>
                        <p className="text-sm text-gray-600">Correct answer: {analysis.correctAnswer}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
  
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => router.push('/abstract')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Continue to Next Section →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }