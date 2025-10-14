import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz, QuizType, QUIZ_TYPE_LABELS} from '../../models/quiz.model';

@Component({
  selector: 'app-admin-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-quiz-list.component.html',
  styleUrls: ['./admin-quiz-list.component.scss']
})
export class AdminQuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = false;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  getTypeLabel(type: QuizType): string {
    return QUIZ_TYPE_LABELS[type] || type;
  }

  loadQuizzes(): void {
    this.loading = true;
    console.log('🔄 Chargement des quiz...');
    this.quizService.findAll().subscribe({
      next: (data) => {
        console.log('✅ Quiz chargés:', data);
        console.log('📊 Nombre de quiz:', data.length);
        this.quizzes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des quiz:', error);
        console.error('Détails:', error.message);
        this.loading = false;
      }
    });
  }

  createQuiz(): void {
    this.router.navigate(['/admin/quiz/new']);
  }

  editQuiz(quizId: number): void {
    this.router.navigate(['/admin/quiz/edit', quizId]);
  }

  deleteQuiz(quizId: number): void {
    // Pour le moment, confirmation simple (on améliorera à l'étape 4)
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.delete(quizId).subscribe({
        next: () => {
          console.log('Quiz supprimé avec succès');
          this.loadQuizzes(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du quiz');
        }
      });
    }
  }
}
