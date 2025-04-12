
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Target, Award } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto text-center">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Target className="h-8 w-8 text-primary" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Sentence Construction</h1>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">
        Complete sentences by placing words in the correct order. Test your language skills and build perfect sentences!
      </p>
      
      <div className="mb-8 space-y-5">
        <div className="flex items-start gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Timed Challenge</h3>
            <p className="text-sm text-gray-600">Each question has a 30-second timer. Complete the sentence before time runs out!</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v2c0 6 6 10 6 10" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-lg">Match Words to Blanks</h3>
            <p className="text-sm text-gray-600">Select from the word options to fill blanks and form grammatically correct sentences.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Get Instant Feedback</h3>
            <p className="text-sm text-gray-600">See your score and review correct answers for any mistakes at the end of the quiz.</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onStart}
        className="bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
        size="lg"
      >
        Start Quiz
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <p className="text-xs text-gray-500 mt-4">
        Complete all 10 questions to test your sentence construction skills
      </p>
    </div>
  );
};

export default WelcomeScreen;
