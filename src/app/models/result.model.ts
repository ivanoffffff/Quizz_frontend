export interface Result {
  resultId?: number;
  userId?: number;
  userName?: string;
  quizId?: number;
  quizTitle?: string;
  score: number;
  playDate: string; // ISO 8601 date string
}
