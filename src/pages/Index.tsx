
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchQuizData } from '@/services/apiService';
import { Question, UserAnswer } from '@/types/quiz';
import QuestionSection from '@/components/QuestionSection';
import ResultsSection from '@/components/ResultsSection';
import WelcomeScreen from '@/components/WelcomeScreen';
import { toast } from 'sonner';
import '../App.css';

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  
  const { data: quizData, isLoading, error } = useQuery({
    queryKey: ['quizData'],
    queryFn: fetchQuizData
  });
  
  useEffect(() => {
    if (error) {
      toast.error("Failed to load quiz data. Please try again.");
    }
  }, [error]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleNextQuestion = (userAnswer: string[]) => {
    if (!quizData) return;
    
    const currentQuestion = quizData.data.questions[currentQuestionIndex];
    const isCorrect = areAnswersEqual(userAnswer, currentQuestion.correctAnswer);
    
    setUserAnswers(prev => [
      ...prev, 
      {
        questionId: currentQuestion.questionId,
        userAnswer,
        isCorrect
      }
    ]);
    
    // Add animation when moving to next question
    setAnimate(true);
    
    if (currentQuestionIndex >= quizData.data.questions.length - 1) {
      // Last question - show results after animation
      setTimeout(() => {
        setQuizCompleted(true);
        setAnimate(false);
      }, 300);
    } else {
      // Move to next question after animation
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimate(false);
      }, 300);
    }
  };

  const areAnswersEqual = (userAnswer: string[], correctAnswer: string[]): boolean => {
    if (userAnswer.length !== correctAnswer.length) return false;
    return userAnswer.every((word, index) => word === correctAnswer[index]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Failed to Load Quiz</h2>
          <p className="text-gray-600 mb-4">We couldn't load the quiz data. Please try again later.</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="container mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Sentence Construction</h1>
      </header>
      
      <main className={`container mx-auto ${animate ? 'fade-out' : 'fade-in'}`}>
        {!quizStarted ? (
          <WelcomeScreen onStart={handleStartQuiz} />
        ) : quizCompleted ? (
          <ResultsSection 
            answers={userAnswers} 
            questions={quizData.data.questions} 
            onRestartQuiz={handleStartQuiz}
          />
        ) : (
          <QuestionSection 
            question={quizData.data.questions[currentQuestionIndex]} 
            onNextQuestion={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizData.data.questions.length}
            isLastQuestion={currentQuestionIndex === quizData.data.questions.length - 1}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
