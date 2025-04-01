"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Question 
{
    text: string;
    question: string;
    options: string[];
    correctAnswer: number;
    timeLimit: number;
}

type Answer = number;

const questions: Question [] = [
    {
        text: "Our company recently transitioned to a hybrid work model, requiring employees to work onsite three days weekly. This decision followed a six-month study showing collaborative tasks benefit from face-to-face interaction, while focused work can be done remotely. The policy aims to balance productivity with employee flexibility.",
        question: "What is the primary reason given for implementing the hybrid model?",
        options: [
          "To reduce office space costs",
          "To accommodate employee travel time",
          "To optimize different work activities",
          "To comply with new labor regulations"
        ],
        correctAnswer: 2,
        timeLimit: 30
    },
    {
        text: "The municipal recycling program now requires residents to separate glass from other recyclables. This change addresses contamination issues in single-stream recycling, where broken glass renders 20% of materials unrecyclable. Proper sorting enables more efficient processing at specialized facilities.",
        question: "What immediate consequence prompted the new sorting rule?",
        options: [
          "Increased collection costs",
          "Material contamination issues",
          "Public demand for sustainability",
          "Shortage of recycling bins"
        ],
        correctAnswer: 1,
        timeLimit: 30
    },
    {
        text: "While machine learning algorithms now achieve 98% accuracy in medical imaging analysis, they serve as decision-support tools rather than diagnostic replacements. These systems flag potential anomalies for radiologist review, combining computational speed with human clinical judgment.",
        question: "What is the author's primary argument about AI in radiology?",
        options: [
          "It will make radiologists obsolete",
          "It works best in collaboration with humans",
          "It's less accurate than traditional methods",
          "It's too expensive for widespread use"
        ],
        correctAnswer: 1,
        timeLimit: 30
    },
    {
        text: "Demand-pull inflation occurs when consumer demand outstrips production capacity, causing price increases. This contrasts with cost-push inflation driven by rising production expenses. Central banks often respond to demand-pull scenarios with interest rate hikes to reduce spending.",
        question: "Which factor is NOT listed as a cause of inflation?",
        options: [
          "Excessive consumer demand",
          "Increased manufacturing costs",
          "Government subsidy programs",
          "Production capacity limitations"
        ],
        correctAnswer: 2,
        timeLimit: 30
    },
    {
        text: "The Industrial Revolution's factory system concentrated production in urban areas, creating unprecedented migration from rural communities. This urbanization led to overcrowded cities but also fostered new social structures and labor organizations advocating workers' rights.",
        question: "Which statement is directly supported by the text?",
        options: [
          "Agricultural productivity declined during this period",
          "Urban living conditions were universally improved",
          "Population distribution patterns changed significantly",
          "Labor unions immediately gained political power"
        ],
        correctAnswer: 2,
        timeLimit: 30
    }
] 

export default function VerbalTest() 
{
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


    const handleAnswer = (answer: Answer) => {
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
        if (currentQuestion < questions.length - 1) 
        {
            setCurrentQuestion(prev => prev + 1);
            setTimeLeft(questions[currentQuestion + 1].timeLimit);
        } 
        else 
        {
            setShowResults(true);
        }
    };

    const getAnswerAnalysis = () => {
        return questions.map((question, index) => ({
          questionNumber: index + 1,
          correct: answers[index] === question.correctAnswer,
          userAnswer: question.options[answers[index]],
          correctAnswer: question.options[question.correctAnswer]
        }));
      };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 relative">
        <div className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full">
          Time left: {timeLeft} seconds
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Passage</h3>
          <p className="text-gray-600 leading-relaxed">
            {questions[currentQuestion].text}
          </p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Question</h3>
          <p className="text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </p>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors"
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
                    <p className="text-sm text-gray-600">Correct answer: {analysis.correctAnswer}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => router.push('/numerical')}
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