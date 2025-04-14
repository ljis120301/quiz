import { promises as fs } from 'fs';
import path from 'path';

// Function to calculate time estimate based on number of questions
function calculateTimeEstimate(questionCount) {
  // Assuming 45 seconds per question
  const totalSeconds = questionCount * 45;
  const minutes = Math.ceil(totalSeconds / 60);
  return `${minutes} mins`;
}

export async function GET() {
  try {
    const quizzesDirectory = path.join(process.cwd(), 'public/data/quizzes');
    const files = await fs.readdir(quizzesDirectory);
    
    const quizzes = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(quizzesDirectory, file);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const quiz = JSON.parse(fileContents);
          
          // Calculate question count and time estimate
          const questionCount = quiz.questions.length;
          const timeEstimate = calculateTimeEstimate(questionCount);
          
          // Return quiz with calculated metadata
          return {
            ...quiz,
            questionCount,
            timeEstimate
          };
        })
    );

    return new Response(JSON.stringify(quizzes), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading quiz files:', error);
    return new Response(JSON.stringify({ error: 'Failed to load quizzes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 