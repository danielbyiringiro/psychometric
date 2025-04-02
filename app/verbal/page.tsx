import VerbalTest from "./verbalTest";

interface Question 
{
    text: string;
    question: string;
    options: string[];
    correctAnswer: number;
    timeLimit: number;
}

const numQuestions = 5;

const questionsDatabase: Question [] = [
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
        timeLimit: 60
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
        timeLimit: 60
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
        timeLimit: 60
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
        timeLimit: 60
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
        timeLimit: 60
    },
    {
      text: "A 2023 climate policy introduced tax credits for solar panel installations, resulting in a 40% adoption increase in metropolitan areas. This incentivization strategy aims to accelerate the transition from fossil fuels while reducing household energy costs.",
      question: "What is the primary goal of the tax credit policy?",
      options: [
          "To increase municipal tax revenue",
          "To reduce reliance on non-renewable energy",
          "To fund new power plant construction",
          "To create solar panel manufacturing jobs"
      ],
      correctAnswer: 1,
      timeLimit: 60
    },
    {
      text: "Educational research indicates students in hybrid learning programs (50% in-person, 50% remote) demonstrate 15% better retention than fully remote counterparts. However, this benefit only appears in learners with strong self-regulation skills.",
      question: "What key qualification is noted about the study results?",
      options: [
          "Applies only to STEM subjects",
          "Depends on technological access",
          "Correlates with student motivation",
          "Requires parental supervision"
      ],
      correctAnswer: 2,
      timeLimit: 60
    },
    {
      text: "Blockchain technology adoption in supply chain management has reduced counterfeit goods by 32% in pilot programs. The immutable transaction records help verify authentic product journeys from manufacturer to retailer.",
      question: "What is the key advantage of blockchain mentioned?",
      options: [
          "Faster shipping times",
          "Enhanced product traceability",
          "Lower implementation costs",
          "Reduced packaging waste"
      ],
      correctAnswer: 1,
      timeLimit: 60
    },
    {
      text: "Recent psychological studies found a correlation between social media usage exceeding 3 hours daily and increased anxiety levels in adolescents. However, researchers caution that correlation does not imply causation.",
      question: "What conclusion is supported by the text?",
      options: [
          "Social media causes clinical anxiety",
          "Teens should completely avoid digital platforms",
          "Screen time directly predicts mental health",
          "Observed relationship requires further investigation"
      ],
      correctAnswer: 3,
      timeLimit: 60
    },
    {
      text: "The French Revolution's economic triggers included regressive tax systems burdening the Third Estate and widespread crop failures. Political philosophers argue these conditions created fertile ground for systemic change.",
      question: "Which factor is NOT mentioned as contributing to the Revolution?",
      options: [
          "Unequal taxation",
          "Agricultural crises",
          "Military overspending",
          "Social class tensions"
      ],
      correctAnswer: 2,
      timeLimit: 60
    },
    {
      text: "Bilingual education programs show participants develop enhanced executive functioning, particularly in task-switching and conflict resolution. These cognitive benefits persist even when second language proficiency remains intermediate.",
      question: "What is the main argument about bilingual education?",
      options: [
          "Requires full fluency for benefits",
          "Primarily improves cultural awareness",
          "Enhances specific cognitive skills",
          "Delays native language development"
      ],
      correctAnswer: 2,
      timeLimit: 60
    },
    {
      text: "GDPR regulations mandate that companies collecting EU citizen data must obtain explicit consent through clear, accessible opt-in mechanisms. Non-compliance penalties can reach 4% of global revenue.",
      question: "What is the key requirement under GDPR?",
      options: [
          "Data encryption standards",
          "User consent transparency",
          "Annual security audits",
          "Data localization within EU"
      ],
      correctAnswer: 1,
      timeLimit: 60
    },
    {
      text: "Darwin's theory of natural selection proposes that organisms with advantageous traits have higher survival and reproduction rates. Over generations, these traits become more common in populations.",
      question: "What is the central mechanism described?",
      options: [
          "Intentional adaptation to environment",
          "Random genetic mutations",
          "Differential reproductive success",
          "Interspecies competition"
      ],
      correctAnswer: 2,
      timeLimit: 60
    },
    {
      text: "Sleep deprivation studies reveal that adults getting ≤5 hours nightly show 30% slower cognitive processing and impaired memory consolidation. These effects mirror moderate alcohol intoxication levels.",
      question: "What is the main finding about sleep deprivation?",
      options: [
          "Causes permanent brain damage",
          "Reduces life expectancy",
          "Affects mental performance",
          "Leads to weight gain"
      ],
      correctAnswer: 2,
      timeLimit: 60
    },
    {
      text: "Metropolitan areas with expanded metro systems report 22% fewer private vehicle commutes. Urban planners attribute this shift to improved reliability and real-time tracking features in modern transit apps.",
      question: "What outcome is associated with improved public transit?",
      options: [
          "Increased road maintenance costs",
          "Reduced car dependency",
          "Higher air pollution levels",
          "Decreased ride-sharing usage"
      ],
      correctAnswer: 1,
      timeLimit: 60
    }
] 

function getRandomQuestions(database: Question [], count: number) : Question []
{
  const shuffled = [...database].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const questions : Question [] = getRandomQuestions(questionsDatabase, numQuestions)

export default function Verbal()
{
  return (
    <VerbalTest questions={questions} />
  )
}
