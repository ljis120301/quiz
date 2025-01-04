import Link from 'next/link';

const availableTests = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your knowledge across various topics',
    questionCount: 10,
    timeEstimate: '10 mins',
    difficulty: 'Medium',
    icon: '🎯'
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Test your science knowledge',
    questionCount: 10,
    timeEstimate: '10 mins',
    difficulty: 'Medium',
    icon: '🔬'
  }
  // Add more tests here as needed
];

export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTests.map((test) => (
          <Link 
            href={`/quiz/${test.id}`} 
            key={test.id}
            className="block h-full"
          >
            <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 
                          hover:shadow-lg transition-all duration-200 p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-3xl mb-2 block">{test.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{test.title}</h3>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                               font-medium bg-blue-100 text-blue-800">
                  {test.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{test.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                <span>{test.questionCount} questions</span>
                <span>{test.timeEstimate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
