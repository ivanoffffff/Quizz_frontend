export interface Question {
  questionId?: number;
  quizId?: number;
  statement: string;
  choices: string[];
  correctAnswer: string;
}
