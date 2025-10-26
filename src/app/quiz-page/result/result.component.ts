import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/quiz-state.service';
import { AuthService } from '../../services/auth.service';
import { ResultService } from '../../services/result.service';
import { QuizService } from '../../services/quiz.service';
import { Question } from "../../models";

interface QuestionResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  isLoading: boolean = true;
  score: number = 0;
  totalQuestions: number = 0;
  quizTitle: string = '';
  userName: string = '';
  questionResults: QuestionResult[] = [];
  errorMessage: string = '';
  isSaved: boolean = false;

  constructor(
    private quizStateService: QuizStateService,
    private authService: AuthService,
    private resultService: ResultService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifie qu'un utilisateur est connecté
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/auth']);
      return;
    }

    // Vérifie qu'un quiz est en cours
    const quizProgress = this.quizStateService.getQuizProgress();
    if (!quizProgress) {
      this.router.navigate(['/']);
      return;
    }

    this.userName = currentUser.name;
    this.quizTitle = quizProgress.quizTitle;
    this.totalQuestions = quizProgress.totalQuestions;

    // Charge les questions du quiz pour calculer le score
    this.calculateScore(quizProgress.quizId, quizProgress.answers, currentUser.userId!);
  }

  /**
   * Calcule le score et sauvegarde le résultat
   */
  calculateScore(quizId: number, userAnswers: any[], userId: number): void {
    this.quizService.findById(quizId).subscribe({
      next: (quiz) => {
        if (!quiz.questions || quiz.questions.length === 0) {
          this.errorMessage = 'Impossible de récupérer les questions du quiz';
          this.isLoading = false;
          return;
        }

        // Crée un map des réponses utilisateur
        const answersMap = new Map(
          userAnswers.map(a => [a.questionId, a.selectedAnswer])
        );

        // Compare les réponses et calcule le score
        let correctAnswers = 0;
        this.questionResults = [];

        quiz.questions.forEach((question: Question) => {
          const userAnswer = answersMap.get(question.questionId!) || '';
          const isCorrect = userAnswer === question.correctAnswer;

          if (isCorrect) {
            correctAnswers++;
          }

          this.questionResults.push({
            question: question.statement,
            userAnswer: userAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect: isCorrect
          });
        });

        this.score = correctAnswers;

        // Sauvegarde le résultat en base de données
        this.saveResult(userId, quizId, correctAnswers);
      },
      error: (error) => {
        console.error('Erreur lors du calcul du score:', error);
        this.errorMessage = 'Impossible de calculer ton score';
        this.isLoading = false;
      }
    });
  }

  /**
   * Sauvegarde le résultat en base de données
   */
  saveResult(userId: number, quizId: number, score: number): void {
    this.resultService.create(userId, quizId, score).subscribe({
      next: () => {
        console.log('Résultat sauvegardé avec succès');
        this.isSaved = true;
        this.isLoading = false;

        // Nettoie le localStorage après sauvegarde
        this.quizStateService.clearQuizProgress();
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde du résultat:', error);
        // On affiche quand même le score, mais on informe de l'erreur
        this.errorMessage = 'Score calculé, mais erreur lors de la sauvegarde';
        this.isLoading = false;
      }
    });
  }

  /**
   * Calcule le pourcentage de réussite
   */
  getScorePercentage(): number {
    return Math.round((this.score / this.totalQuestions) * 100);
  }

  /**
   * Obtient le message de félicitations
   */
  getCongratulatoryMessage(): string {
    const percentage = this.getScorePercentage();

    if (percentage === 100) {
      return 'Parfait ! 🎉';
    } else if (percentage >= 80) {
      return 'Excellent ! 🌟';
    } else if (percentage >= 60) {
      return 'Bien joué ! 👍';
    } else if (percentage >= 40) {
      return 'Pas mal ! 💪';
    } else {
      return 'Continue à t\'entraîner ! 📚';
    }
  }

  /**
   * Retour à l'accueil
   */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Rejouer le même quiz
   */
  retakeQuiz(): void {
    const quizProgress = this.quizStateService.getQuizProgress();
    if (quizProgress) {
      this.router.navigate(['/quiz', quizProgress.quizId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
