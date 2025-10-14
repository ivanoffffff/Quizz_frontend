import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';


@Component({
  selector: 'admin-quiz-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-quiz-form.component.html',
  styleUrl: './admin-quiz-form.component.scss'
})
export class AdminQuizFormComponent {
  quizForm: FormGroup;
  isEditMode = false;
  currentQuizId: number | null = null;
  questionsCount = 0;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL si on est en mode édition
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.currentQuizId = parseInt(id, 10);
      this.loadQuiz(this.currentQuizId);
    }
  }

  loadQuiz(id: number): void {
    console.log('🔄 Chargement du quiz:', id);
    this.quizService.findById(id).subscribe({
      next: (quiz) => {
        console.log('✅ Quiz chargé:', quiz);
        this.quizForm.patchValue({
          title: quiz.title,
          type: quiz.type,
          description: quiz.description
        });
        this.questionsCount = quiz.questions?.length || 0;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement du quiz:', error);
        alert('Erreur lors du chargement du quiz');
        this.goBack();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.quizForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.quizForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.quizForm.controls).forEach(key => {
        this.quizForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.saving = true;
    const quizData: Quiz = {
      quizId: this.currentQuizId || 0,
      title: this.quizForm.value.title,
      type : this.quizForm.value.type,
      description: this.quizForm.value.description
    };

    if (this.isEditMode && this.currentQuizId) {
      // Mode édition
      this.quizService.update(this.currentQuizId, quizData).subscribe({
        next: (updatedQuiz) => {
          console.log('✅ Quiz mis à jour:', updatedQuiz);
          this.saving = false;
          alert('Quiz modifié avec succès !');
          this.goBack();
        },
        error: (error) => {
          console.error('❌ Erreur lors de la modification:', error);
          this.saving = false;
          alert('Erreur lors de la modification du quiz');
        }
      });
    } else {
      // Mode création
      this.quizService.create(quizData).subscribe({
        next: (createdQuiz) => {
          console.log('✅ Quiz créé:', createdQuiz);
          this.saving = false;
          alert(`Quiz créé avec succès ! Vous pouvez maintenant ajouter des questions.`);
          // Rediriger vers le mode édition pour permettre d'ajouter des questions
          this.router.navigate(['/admin/quiz/edit', createdQuiz.quizId]);
        },
        error: (error) => {
          console.error('❌ Erreur lors de la création:', error);
          this.saving = false;
          alert('Erreur lors de la création du quiz');
        }
      });
    }
  }

  manageQuestions(): void {
    if (this.currentQuizId) {
      // Navigation vers la gestion des questions (à implémenter à l'étape 3)
      this.router.navigate(['/admin/quiz', this.currentQuizId, 'questions']);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/quizzes']);
  }
}
