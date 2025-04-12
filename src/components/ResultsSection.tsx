
import { UserAnswer, Question } from '../types/quiz';
import { Check, X, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultsSectionProps {
  answers: UserAnswer[];
  questions: Question[];
  onRestartQuiz: () => void;
}

const ResultsSection = ({ answers, questions, onRestartQuiz }: ResultsSectionProps) => {
  // Calculate the total score
  const totalCorrect = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);

  // Determine feedback message based on score
  const getFeedbackMessage = () => {
    if (scorePercentage >= 90) return { message: 'Excellent!', description: 'You have an exceptional grasp of sentence construction.' };
    if (scorePercentage >= 70) return { message: 'Great job!', description: 'You have a strong understanding of sentence construction.' };
    if (scorePercentage >= 50) return { message: 'Good effort!', description: 'You\'re on the right track with sentence construction.' };
    return { message: 'Keep practicing!', description: 'With more practice, you\'ll improve your sentence construction skills.' };
  };

  const feedback = getFeedbackMessage();

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className={cn(
            "flex items-center justify-center w-28 h-28 rounded-full mb-4 mx-auto",
            scorePercentage >= 70 ? "bg-green-100" : 
            scorePercentage >= 50 ? "bg-yellow-100" : 
            "bg-red-100"
          )}>
            <div className={cn(
              "flex items-center justify-center w-24 h-24 rounded-full text-white font-bold text-2xl",
              scorePercentage >= 70 ? "bg-green-500" : 
              scorePercentage >= 50 ? "bg-yellow-500" : 
              "bg-red-500"
            )}>
              {scorePercentage}%
            </div>
          </div>
          <Award className={cn(
            "absolute -right-2 -top-1 h-8 w-8",
            scorePercentage >= 90 ? "text-yellow-400" :
            scorePercentage >= 70 ? "text-blue-400" :
            "text-gray-400"
          )} />
        </div>
        
        <h2 className="text-2xl font-bold mb-1">{feedback.message}</h2>
        <p className="text-gray-600 mb-2">{feedback.description}</p>
        <p className="font-medium">
          You got <span className="text-primary font-bold">{totalCorrect}</span> out of <span className="font-bold">{totalQuestions}</span> questions correct
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2">Question Review</h3>
        
        {answers.map((answer, index) => {
          // Find the corresponding question
          const question = questions.find(q => q.questionId === answer.questionId);
          
          if (!question) return null;
          
          return (
            <div key={index} className={cn(
              "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
              answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            )}>
              <div className="flex items-start gap-2 mb-3">
                {answer.isCorrect ? 
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /> : 
                  <X className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                }
                <div>
                  <h4 className="font-medium flex items-center flex-wrap">
                    Question {index + 1}
                    <span className={cn(
                      "ml-2 text-sm px-2 py-0.5 rounded-full",
                      answer.isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{question.question.replace(/_____________/g, '_____')}</p>
                </div>
              </div>
              
              {!answer.isCorrect && (
                <div className="ml-7 space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Your answer:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {answer.userAnswer.map((word, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 text-sm bg-white border border-red-300 text-red-700 rounded-md"
                        >
                          {word || "—"}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Correct answer:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {question.correctAnswer.map((word, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 text-sm bg-white border border-green-300 text-green-700 rounded-md"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={onRestartQuiz} 
          className="bg-primary hover:bg-primary-dark"
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
