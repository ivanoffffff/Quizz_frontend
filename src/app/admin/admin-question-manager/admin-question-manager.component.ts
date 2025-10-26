import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { QuizService } from '../../services/quiz.service';
import { Question } from "../../models";

@Component({
  selector: 'app-admin-question-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-question-manager.component.html',
  styleUrls: ['./admin-question-manager.component.scss']
})
export class AdminQuestionManagerComponent implements OnInit {
  questionForm: FormGroup;
  questions: Question[] = [];
  quizId: number | null = null;
  quizTitle = '';
  isEditingQuestion = false;
  currentQuestionId: number | null = null;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.questionForm = this.fb.group({
      statement: ['', [Validators.required, Validators.minLength(5)]],
      choices: this.fb.array([], this.minChoicesValidator),
      correctAnswer: ['', Validators.required]
    });

    // Initialiser avec 4 choix par défaut
    for (let i = 0; i < 4; i++) {
      this.addChoice();
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('quizId');

    if (id) {
      this.quizId = parseInt(id, 10);
      this.loadQuizInfo(this.quizId);
      this.loadQuestions(this.quizId);
    } else {
      console.error('❌ ID du quiz manquant');
      this.goBack();
    }
  }

  get choices(): FormArray {
    return this.questionForm.get('choices') as FormArray;
  }

  minChoicesValidator(control: AbstractControl): ValidationErrors | null {
    const choices = control as FormArray;
    const validChoices = choices.controls.filter(c => c.value && c.value.trim()).length;
    return validChoices >= 2 ? null : { minChoices: true };
  }

  loadQuizInfo(quizId: number): void {
    this.quizService.findById(quizId).subscribe({
      next: (quiz) => {
        this.quizTitle = quiz.title;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement du quiz:', error);
      }
    });
  }

  loadQuestions(quizId: number): void {
    console.log('🔄 Chargement des questions pour le quiz:', quizId);
    this.questionService.findByQuizId(quizId).subscribe({
      next: (data) => {
        console.log('✅ Questions chargées:', data);
        this.questions = data;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des questions:', error);
      }
    });
  }

  addChoice(): void {
    if (this.choices.length < 6) {
      this.choices.push(this.fb.control('', Validators.required));
    }
  }

  removeChoice(index: number): void {
    if (this.choices.length > 2) {
      this.choices.removeAt(index);
      // Réinitialiser la bonne réponse si elle était supprimée
      const currentCorrect = this.questionForm.get('correctAnswer')?.value;
      const validChoices = this.getValidChoices();
      if (!validChoices.includes(currentCorrect)) {
        this.questionForm.patchValue({ correctAnswer: '' });
      }
    }
  }

  getValidChoices(): string[] {
    return this.choices.controls
      .map(c => c.value)
      .filter(v => v && v.trim());
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.questionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  saveQuestion(): void {
    // Marquer tous les champs comme touchés
    Object.keys(this.questionForm.controls).forEach(key => {
      this.questionForm.get(key)?.markAsTouched();
    });
    this.choices.controls.forEach(control => control.markAsTouched());

    if (this.questionForm.invalid) {
      console.log('❌ Formulaire invalide');
      return;
    }

    this.saving = true;
    const validChoices = this.getValidChoices();

    const questionData: Question = {
      quizId: this.quizId!,
      statement: this.questionForm.value.statement,
      choices: validChoices,
      correctAnswer: this.questionForm.value.correctAnswer
    };

    if (this.isEditingQuestion && this.currentQuestionId) {
      // Mode édition
      questionData.questionId = this.currentQuestionId;
      this.questionService.update(this.currentQuestionId, questionData).subscribe({
        next: (updatedQuestion) => {
          console.log('✅ Question mise à jour:', updatedQuestion);
          this.saving = false;
          this.loadQuestions(this.quizId!);
          this.cancelEdit();
          alert('Question modifiée avec succès !');
        },
        error: (error) => {
          console.error('❌ Erreur lors de la modification:', error);
          this.saving = false;
          alert('Erreur lors de la modification de la question');
        }
      });
    } else {
      // Mode création
      this.questionService.create(questionData).subscribe({
        next: (createdQuestion) => {
          console.log('✅ Question créée:', createdQuestion);
          this.saving = false;
          this.loadQuestions(this.quizId!);
          this.resetForm();
          alert('Question ajoutée avec succès !');
        },
        error: (error) => {
          console.error('❌ Erreur lors de la création:', error);
          this.saving = false;
          alert('Erreur lors de la création de la question');
        }
      });
    }
  }

  editQuestion(question: Question): void {
    this.isEditingQuestion = true;
    this.currentQuestionId = question.questionId!;

    // Réinitialiser le FormArray des choix
    while (this.choices.length) {
      this.choices.removeAt(0);
    }

    // Ajouter les choix existants
    question.choices.forEach(choice => {
      this.choices.push(this.fb.control(choice, Validators.required));
    });

    // Remplir le formulaire
    this.questionForm.patchValue({
      statement: question.statement,
      correctAnswer: question.correctAnswer
    });

    // Scroll vers le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      this.questionService.delete(questionId).subscribe({
        next: () => {
          console.log('✅ Question supprimée');
          this.loadQuestions(this.quizId!);

          // Si on était en train d'éditer cette question, annuler l'édition
          if (this.currentQuestionId === questionId) {
            this.cancelEdit();
          }
        },
        error: (error) => {
          console.error('❌ Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de la question');
        }
      });
    }
  }

  cancelEdit(): void {
    this.isEditingQuestion = false;
    this.currentQuestionId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.questionForm.reset();

    // Réinitialiser les choix (4 par défaut)
    while (this.choices.length) {
      this.choices.removeAt(0);
    }
    for (let i = 0; i < 4; i++) {
      this.addChoice();
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/quiz/edit', this.quizId]);
  }
}
