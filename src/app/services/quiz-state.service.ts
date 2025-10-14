import { Injectable } from '@angular/core';

export interface QuizProgress {
  quizId: number;
  quizTitle: string;
  answers: UserAnswer[];
  totalQuestions: number;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {
  private readonly STORAGE_KEY = 'currentQuizProgress';

  /**
   * Sauvegarde la progression du quiz dans localStorage
   */
  saveQuizProgress(quizId: number, quizTitle: string, answers: UserAnswer[], totalQuestions: number): void {
    const progress: QuizProgress = {
      quizId,
      quizTitle,
      answers,
      totalQuestions
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  /**
   * Récupère la progression du quiz depuis localStorage
   */
  getQuizProgress(): QuizProgress | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Efface la progression du quiz
   */
  clearQuizProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Vérifie si un quiz est en cours
   */
  hasQuizInProgress(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
