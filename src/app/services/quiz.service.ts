import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  private quizzes: Quiz[] = [
    { id: 1, title: 'Football Quiz', description: '10 questions', color: '#3498db', hoverColor: '#f0f8ff'},
    { id: 2, title: 'Basketball Quiz', description: '10 questions',color: '#e74c3c', hoverColor: '#fff5f0' }
  ];

  getAllQuizzes(): Observable<Quiz[]> {
    return of(this.quizzes);
  }
}
