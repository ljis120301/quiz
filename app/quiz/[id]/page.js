import Quiz from '@/app/components/Quiz';

export default async function QuizPage({ params }) {
  const { id } = await params;
  return (
    <div className="p-6">
      <Quiz quizId={id} />
    </div>
  );
} 