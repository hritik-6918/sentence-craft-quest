
import { useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import Blank from './Blank';
import WordOption from './WordOption';
import Timer from './Timer';
import { Button } from '@/components/ui/button';
import { ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionSectionProps {
  question: Question;
  onNextQuestion: (userAnswer: string[]) => void;
  questionNumber: number;
  totalQuestions: number;
  isLastQuestion: boolean;
}

const QuestionSection = ({ 
  question,
  onNextQuestion,
  questionNumber,
  totalQuestions,
  isLastQuestion
}: QuestionSectionProps) => {
  // Split the question text by the blank placeholders
  const questionParts = question.question.split('_____________');
  const blankCount = questionParts.length - 1;

  // State to track which word option is placed in which blank
  const [placedWords, setPlacedWords] = useState<(string | null)[]>(Array(blankCount).fill(null));
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [showInstructions, setShowInstructions] = useState<boolean>(questionNumber === 1);

  // Reset state when question changes
  useEffect(() => {
    setPlacedWords(Array(blankCount).fill(null));
    setSelectedIndices(new Set());
    setShowInstructions(questionNumber === 1);
  }, [question, blankCount, questionNumber]);

  // Handle placing a word in a blank
  const handlePlaceWord = (word: string, optionIndex: number) => {
    const firstEmptyIndex = placedWords.findIndex(item => item === null);
    
    if (firstEmptyIndex !== -1) {
      const newPlacedWords = [...placedWords];
      newPlacedWords[firstEmptyIndex] = word;
      setPlacedWords(newPlacedWords);
      
      // Mark this option as selected
      setSelectedIndices(prev => {
        const updated = new Set(prev);
        updated.add(optionIndex);
        return updated;
      });
    }
  };

  // Handle clicking on a filled blank (removing the word)
  const handleBlankClick = (index: number) => {
    if (placedWords[index]) {
      const wordToRemove = placedWords[index];
      
      // Find which option index this word corresponds to
      const optionIndex = question.options.findIndex(option => option === wordToRemove);
      
      // Remove the word from the blank
      const newPlacedWords = [...placedWords];
      newPlacedWords[index] = null;
      setPlacedWords(newPlacedWords);
      
      // Mark this option as unselected
      if (optionIndex !== -1) {
        setSelectedIndices(prev => {
          const updated = new Set(prev);
          updated.delete(optionIndex);
          return updated;
        });
      }
    }
  };

  const handleTimeUp = () => {
    // Automatically submit the current state of the answer when time is up
    onNextQuestion(placedWords.map(word => word || ""));
  };

  const handleNext = () => {
    // Submit the current answers when next button is clicked
    onNextQuestion(placedWords.map(word => word || ""));
  };

  // Check if all blanks are filled to enable the Next button
  const allBlanksFilled = placedWords.every(word => word !== null);

  // Render the question with blanks and filled words
  const renderQuestionWithBlanks = () => {
    return (
      <div className="text-lg md:text-xl leading-relaxed">
        {questionParts.map((part, index) => (
          <span key={index}>
            {part}
            {index < questionParts.length - 1 && (
              <Blank 
                word={placedWords[index] || undefined} 
                index={index}
                onClick={handleBlankClick}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-primary"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <Info className="h-4 w-4 mr-1" />
              Help
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Instructions panel */}
      {showInstructions && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-700">
          <h4 className="font-medium mb-1">How to complete this question:</h4>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li>Select words from the options below to fill in the blanks</li>
            <li>Click on a filled blank to remove the word</li>
            <li>Fill all blanks to enable the Next button</li>
            <li>Complete before the timer runs out (30 seconds)</li>
          </ol>
          <Button 
            variant="link" 
            size="sm" 
            className="mt-1 text-blue-700 p-0 h-auto"
            onClick={() => setShowInstructions(false)}
          >
            Dismiss
          </Button>
        </div>
      )}
      
      {/* Timer */}
      <div className="mb-6">
        <Timer duration={30} onTimeUp={handleTimeUp} />
      </div>
      
      {/* Question */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
        {renderQuestionWithBlanks()}
      </div>
      
      {/* Word options */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {question.options.map((word, index) => (
          <WordOption
            key={index}
            word={word}
            isUsed={selectedIndices.has(index)}
            onClick={() => handlePlaceWord(word, index)}
          />
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!allBlanksFilled}
          className={cn(
            "transition-all duration-300 group",
            allBlanksFilled 
              ? "bg-primary hover:bg-primary-dark" 
              : "bg-gray-300"
          )}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
          <ChevronRight className="ml-1 h-4 w-4 group-hover:animate-bounce-x" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionSection;
