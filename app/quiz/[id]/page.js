import Quiz from '@/app/components/Quiz';

export default async function QuizPage({ params }) {
  return (
    <div className="p-6">
      <Quiz quizId={await params.id} />
    </div>
  );
} 