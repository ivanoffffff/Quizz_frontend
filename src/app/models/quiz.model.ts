import { Question } from './question.model';

export type QuizType =
  | 'FOOTBALL'
  | 'BASKETBALL'
  | 'TENNIS'
  | 'GOLF'
  | 'ATHLETISME'
  | 'NATATION'
  | 'RUGBY'
  | 'AUTRE';

export interface Quiz {
  quizId: number;
  title: string;
  description: string;
  type: QuizType;
  questions?: Question[];
}

export const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  FOOTBALL: 'Football',
  BASKETBALL: 'Basketball',
  TENNIS: 'Tennis',
  GOLF: 'Golf',
  ATHLETISME: 'Athlétisme',
  NATATION: 'Natation',
  RUGBY: 'Rugby',
  AUTRE: 'Autre'
};
