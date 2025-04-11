import React from "react";
import AbstractTest from "./abstractTest";
import PatternDisplay from "./pattern_display";

interface Question 
{
    text: string;
    question: string;
    options: React.ReactNode[];
    correctAnswer: number;
    timeLimit: number;
    visualPattern?: React.ReactNode;
}

const questionsDatabase: Question[] = [
  {
    text: "Shape Sequence Pattern",
    question: "Which shape completes the sequence?",
    options: [
      <PatternDisplay key="opt1">
        <polygon points="20,5 35,30 5,30" />
        <polygon points="20,30 35,20 20,10 5,20" />
      </PatternDisplay>,
      <PatternDisplay key="opt2">
        <rect x="10" y="10" width="20" height="20" transform="rotate(45, 20, 20)" />
      </PatternDisplay>,
      <PatternDisplay key="opt3">
        <polygon points="35,20 20,5 20,35" />
      </PatternDisplay>,
      <PatternDisplay key="opt4">
        <polygon points="20,5 35,20 20,35 5,20" />
        <polygon points="20,20 35,30 20,10" />
      </PatternDisplay>
    ],
    correctAnswer: 2,
    timeLimit: 120,
    visualPattern: (
      <div className="pattern-sequence">
        <PatternDisplay>
          <polygon points="20,5 35,30 5,30" />
        </PatternDisplay>
        <PatternDisplay>
          <polygon points="5,20 30,5 30,35" />
        </PatternDisplay>
        <PatternDisplay>
          <polygon points="20,35 35,10 5,10" />
        </PatternDisplay>
        <div className="question-mark">?</div>
      </div>
    )
  },
  {
    text: "Symmetry Identification",
    question: "Which shape is the mirror image of the original?",
    options: [
      <PatternDisplay key="opt1">
        <path d="M10 10L30 10 30 30 10 30ZM10 10L30 10 10 30" />
      </PatternDisplay>,
      <PatternDisplay key="opt2">
        <path d="M10 10L30 10 30 30 10 30ZM10 30L30 10" />
      </PatternDisplay>,
      <PatternDisplay key="opt3">
        <path d="M10 10L30 10 30 30 10 30ZM10 10L10 30 30 10" />
      </PatternDisplay>,
      <PatternDisplay key="opt4">
        <path d="M10 10L30 10 30 30 10 30ZM30 30L30 10 10 30" />
      </PatternDisplay>
    ],
    correctAnswer: 3,
    timeLimit: 120,
    visualPattern: (
      <div className="mirror-pattern">
        <PatternDisplay>
          <path d="M10 10L30 10 30 30 10 30ZM10 10L10 30 30 10" />
        </PatternDisplay>
        <div className="mirror-line"></div>
        <div className="question-mark">?</div>
      </div>
    )
  },
  {
    text: "Rotation Analysis",
    question: "How will the shape appear after 360° clockwise rotation?",
    options: [
      <PatternDisplay key="opt1">
        {/* Correct Answer: Hexagon with a rotated diamond at 135° */}
        <polygon points="20,5 30,10 35,20 30,30 20,35 10,30 5,20 10,10" />
        <polygon points="20,10 25,15 30,20 25,25 20,30 15,25 10,20 15,15" />
      </PatternDisplay>,
      <PatternDisplay key="opt2">
        {/* False Option 1: Rotated incorrectly by 90° */}
        <polygon points="10,20 20,5 30,10 35,20 30,30 20,35 10,30 5,20" />
        <polygon points="15,20 20,10 25,15 30,20 25,25 20,30 15,25 10,20" />
      </PatternDisplay>,
      <PatternDisplay key="opt3">
        {/* False Option 2: Mirrored instead of rotated */}
        <polygon points="20,5 10,10 5,20 10,30 20,35 30,30 35,20 30,10" />
        <polygon points="20,10 15,15 10,20 15,25 20,30 25,25 30,20 25,15" />
      </PatternDisplay>,
      <PatternDisplay key="opt4">
        {/* False Option 3: Distorted shape with altered proportions */}
        <polygon points="22,5 32,12 37,22 32,32 22,38 12,32 7,22 12,12" />
        <polygon points="22,12 27,17 32,22 27,27 22,32 17,27 12,22 17,17" />
      </PatternDisplay>
    ],
    correctAnswer: 0,
    timeLimit: 120,
    visualPattern: (
      <div className="rotation-preview">
        <PatternDisplay>
          <polygon points="20,5 30,10 35,20 30,30 20,35 10,30 5,20 10,10" />
          <polygon points="20,10 25,15 30,20 25,25 20,30 15,25 10,20 15,15" />
        </PatternDisplay>
        <div className="rotation-arrow">↻ 360°</div>
      </div>
    )
  },
  {
    text: "Pattern Completion",
    question: "Which tile completes the grid?",
    options: [
      <PatternDisplay key="opt1">
        <path d="M5 15H35M5 25H35M15 5V35M25 5V35" />
      </PatternDisplay>,
      <PatternDisplay key="opt2">
        <path d="M5 10H35M5 20H35M5 30H35M10 5V35M20 5V35M30 5V35" />
      </PatternDisplay>,
      <PatternDisplay key="opt3">
        <path d="M5 10H35M5 20H35M5 30H35M15 5V35M25 5V35" />
      </PatternDisplay>,
      <PatternDisplay key="opt4">
        <path d="M5 13H35M5 27H35M13 5V35M27 5V35" />
      </PatternDisplay>
    ],
    correctAnswer: 1,
    timeLimit: 120,
    visualPattern: (
      <div className="grid-pattern">
        <PatternDisplay>
          <path d="M5 20H35M20 5V35" />
        </PatternDisplay>
        <PatternDisplay>
          <path d="M5 15H35M5 25H35M15 5V35M25 5V35" />
        </PatternDisplay>
        <div className="missing-tile">?</div>
      </div>
    )
  },
  {
    text: "Odd One Out Identification",
    question: "Which shape breaks the pattern?",
    options: [
      <PatternDisplay key="opt1">
        <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" />
      </PatternDisplay>,
      <PatternDisplay key="opt2">
        <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" />
        <circle cx="20" cy="20" r="3" />
      </PatternDisplay>,
      <PatternDisplay key="opt3">
        <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" 
                 transform="rotate(30 20 20)" />
      </PatternDisplay>,
      <PatternDisplay key="opt4">
        <circle cx="20" cy="20" r="15" />
      </PatternDisplay>
    ],
    correctAnswer: 3,
    timeLimit: 120,
    visualPattern: (
      <div className="shape-group">
        <PatternDisplay>
          <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" />
        </PatternDisplay>
        <PatternDisplay>
          <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" />
          <circle cx="20" cy="20" r="3" />
        </PatternDisplay>
        <PatternDisplay>
          <polygon points="20,5 32,12.5 32,27.5 20,35 8,27.5 8,12.5" 
                   transform="rotate(30 20 20)" />
        </PatternDisplay>
        <div className="anomaly-mark">?</div>
      </div>
    )
  } 
  ];

// const numQuestions = 5;

// function getRandomQuestions(database: Question [], count: number) : Question []
// {
//   const shuffled = [...database].sort(() => 0.5 - Math.random())
//   return shuffled.slice(0, count)
// }

// const questions : Question [] = getRandomQuestions(questionsDatabase, numQuestions)

export default function Abstract()
{
  return (
    <AbstractTest questions={questionsDatabase} />
  )
}