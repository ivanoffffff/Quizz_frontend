import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuizStateService, UserAnswer } from '../../services/quiz-state.service';
import { Quiz, Question } from "../../models";

@Component({
  selector: 'quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"]
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null;
  currentQuestionIndex: number = 0;
  currentQuestion: Question | null = null;
  selectedAnswer: string | null = null;
  answers: UserAnswer[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  String = String;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private quizService: QuizService,
    private quizStateService: QuizStateService
  ) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));

    if (!quizId) {
      this.errorMessage = 'Quiz introuvable';
      this.isLoading = false;
      return;
    }

    this.loadQuiz(quizId);
  }

  /**
   * Charge le quiz depuis l'API
   */
  loadQuiz(quizId: number): void {
    this.quizService.findById(quizId).subscribe({
      next: (quiz) => {
        if (!quiz.questions || quiz.questions.length === 0) {
          this.errorMessage = 'Ce quiz ne contient aucune question';
          this.isLoading = false;
          return;
        }

        this.quiz = quiz;
        this.currentQuestion = quiz.questions![0];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du quiz:', error);
        this.errorMessage = 'Impossible de charger le quiz';
        this.isLoading = false;
      }
    });
  }

  /**
   * Sélectionne une réponse
   */
  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  /**
   * Passe à la question suivante ou termine le quiz
   */
  nextQuestion(): void {
    if (!this.selectedAnswer || !this.currentQuestion || !this.quiz) {
      return;
    }

    // Enregistre la réponse
    this.answers.push({
      questionId: this.currentQuestion.questionId!,
      selectedAnswer: this.selectedAnswer
    });

    // Sauvegarde dans localStorage
    this.quizStateService.saveQuizProgress(
      this.quiz.quizId!,
      this.quiz.title,
      this.answers,
      this.quiz.questions!.length
    );

    // Vérifie si c'est la dernière question
    if (this.isLastQuestion()) {
      // Redirige vers la page quiz-finished
      this.router.navigate(['/quiz-finished']);
    } else {
      // Passe à la question suivante
      this.currentQuestionIndex++;
      this.currentQuestion = this.quiz.questions![this.currentQuestionIndex];
      this.selectedAnswer = null;
    }
  }

  /**
   * Vérifie si c'est la dernière question
   */
  isLastQuestion(): boolean {
    if (!this.quiz || !this.quiz.questions) return false;
    return this.currentQuestionIndex === this.quiz.questions.length - 1;
  }

  /**
   * Calcule le pourcentage de progression
   */
  getProgressPercentage(): number {
    if (!this.quiz || !this.quiz.questions) return 0;
    return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100;
  }

  /**
   * Obtient le texte de progression
   */
  getProgressText(): string {
    if (!this.quiz || !this.quiz.questions) return '';
    return `Question ${this.currentQuestionIndex + 1} / ${this.quiz.questions.length}`;
  }

  /**
   * Vérifie si le bouton "Suivant" est activé
   */
  isNextButtonEnabled(): boolean {
    return this.selectedAnswer !== null;
  }

  /**
   * Obtient le texte du bouton
   */
  getButtonText(): string {
    return this.isLastQuestion() ? 'Terminer' : 'Suivant';
  }

  /**
   * Retourne à l'accueil (méthode publique pour le template)
   */
  goHome(): void {
    this.router.navigate(['/']);
  }
}
