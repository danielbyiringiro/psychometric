"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Question {
    text: string;
    question: string;
    options: React.ReactNode[];
    correctAnswer: number;
    timeLimit: number;
    visualPattern?: React.ReactNode;
}

export default function AbstractTest({ questions }: { questions: Question[] }) {
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
        if (percentage >= 90) return { message: "Outstanding! 🎉", color: "bg-gradient-to-r from-purple-400 to-indigo-500" };
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
            explanation: getExplanation(question, index)
        }));
    };

    const getExplanation = (question: Question, index: number) => {
        switch (index) {
            case 0: return "The pattern follows a clockwise rotation sequence completing with the mirrored arrow";
            case 1: return "The mirror image should maintain the original shape proportions with flipped orientation";
            case 2: return "135° rotation maintains the star shape's symmetry while changing spike orientation";
            case 3: return "Grid completion requires matching both horizontal and vertical line patterns";
            case 4: return "The circle breaks the hexagonal pattern of other shapes";
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute top-2 right-2 bg-purple-500 text-white px-4 py-2 rounded-full">
                    Time left: {timeLeft} seconds
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Pattern Visualization</h3>
                    <div className="w-full h-64 flex justify-center items-center pattern-container">
                        {questions[currentQuestion].visualPattern}
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Question</h3>
                    <p className="text-gray-800 mb-6">
                        {questions[currentQuestion].question}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {questions[currentQuestion].options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className="p-6 text-center bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded-lg transition-colors flex items-center justify-center"
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
                                            className="text-purple-500"
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
                                    <div className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600">Your answer:</p>
                                            <div className="scale-75 origin-left">{analysis.userAnswer}</div>
                                        </div>
                                        {!analysis.correct && (
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600">Correct answer:</p>
                                                <div className="scale-75 origin-left">{analysis.correctAnswer}</div>
                                            </div>
                                        )}
                                    </div>
                                    {!analysis.correct && (
                                        <p className="text-sm text-gray-500 mt-2 italic">{analysis.explanation}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => router.push('/')}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}