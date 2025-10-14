import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/quiz-state.service';

@Component({
  selector: 'quiz-finished',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-finished.component.html',
  styleUrls: ['./quiz-finished.component.scss']
})
export class QuizFinishedComponent implements OnInit {
  quizTitle: string = '';
  totalQuestions: number = 0;

  constructor(
    private router: Router,
    private quizStateService: QuizStateService
  ) {}

  ngOnInit(): void {
    // Vérifie qu'un quiz est bien en cours
    const quizProgress = this.quizStateService.getQuizProgress();

    if (!quizProgress) {
      // Pas de quiz en cours, redirige vers l'accueil
      this.router.navigate(['/']);
      return;
    }

    this.quizTitle = quizProgress.quizTitle;
    this.totalQuestions = quizProgress.totalQuestions;
  }

  /**
   * Redirige vers la page d'authentification
   */
  goToAuth(): void {
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: '/result', context: 'quiz' }
    });
  }

  /**
   * Annule le quiz et retourne à l'accueil
   */
  cancelQuiz(): void {
    this.quizStateService.clearQuizProgress();
    this.router.navigate(['/']);
  }
}
