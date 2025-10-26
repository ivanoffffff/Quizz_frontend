// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { QuizStateService } from '../services/quiz-state.service';
//
// @Component({
//   selector: 'auth',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.scss']
// })
// export class AuthComponent implements OnInit {
//   authForm: FormGroup;
//   isLoading: boolean = false;
//   errorMessage: string = '';
//   quizTitle: string = '';
//
//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private quizStateService: QuizStateService,
//     private router: Router
//   ) {
//     this.authForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }
//
//   ngOnInit(): void {
//     // Vérifie qu'un quiz est bien en cours
//     const quizProgress = this.quizStateService.getQuizProgress();
//
//     if (!quizProgress) {
//       // Pas de quiz en cours, redirige vers l'accueil
//       this.router.navigate(['/']);
//       return;
//     }
//
//     this.quizTitle = quizProgress.quizTitle;
//   }
//
//   /**
//    * Soumet le formulaire d'authentification
//    */
//   onSubmit(): void {
//     if (this.authForm.invalid) {
//       this.markFormGroupTouched(this.authForm);
//       return;
//     }
//
//     this.isLoading = true;
//     this.errorMessage = '';
//
//     const { name, email } = this.authForm.value;
//
//     this.authService.loginOrRegister(email, name).subscribe({
//       next: (user) => {
//         console.log('Utilisateur authentifié:', user);
//         // Redirige vers la page de résultats
//         this.router.navigate(['/result']);
//       },
//       error: (error) => {
//         console.error('Erreur lors de l\'authentification:', error);
//         this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
//         this.isLoading = false;
//       }
//     });
//   }
//
//   /**
//    * Marque tous les champs du formulaire comme touchés (pour afficher les erreurs)
//    */
//   private markFormGroupTouched(formGroup: FormGroup): void {
//     Object.keys(formGroup.controls).forEach(key => {
//       const control = formGroup.get(key);
//       control?.markAsTouched();
//     });
//   }
//
//   /**
//    * Vérifie si un champ a une erreur et a été touché
//    */
//   hasError(fieldName: string, errorType?: string): boolean {
//     const field = this.authForm.get(fieldName);
//     if (!field) return false;
//
//     if (errorType) {
//       return field.hasError(errorType) && field.touched;
//     }
//     return field.invalid && field.touched;
//   }
//
//   /**
//    * Retour à l'accueil (annule le quiz)
//    */
//   cancelQuiz(): void {
//     this.quizStateService.clearQuizProgress();
//     this.router.navigate(['/']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  returnUrl: string = '/';
  context: string = 'general';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    console.log('🔵 AuthComponent initialisé');

    // Récupère les paramètres de l'URL (returnUrl et context)
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
      this.context = params['context'] || 'general';
      console.log('🔵 Context:', this.context, '| Return URL:', this.returnUrl);
    });
  }

  /**
   * Soumet le formulaire d'authentification
   */
  onSubmit(): void {
    console.log('🔵 onSubmit appelé');
    console.log('🔵 Formulaire valide ?', this.authForm.valid);
    console.log('🔵 Valeurs du formulaire :', this.authForm.value);

    if (this.authForm.invalid) {
      console.log('❌ Formulaire invalide');
      this.markFormGroupTouched(this.authForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { name, email } = this.authForm.value;
    console.log('🔵 Tentative de connexion avec:', { name, email });

    this.authService.loginOrRegister(email, name).subscribe({
      next: (user) => {
        console.log('✅ Utilisateur authentifié:', user);
        // Redirige vers l'URL de retour
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        console.error('❌ Erreur lors de l\'authentification:', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Marque tous les champs du formulaire comme touchés
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Vérifie si un champ a une erreur
   */
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.authForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && field.touched;
    }
    return field.invalid && field.touched;
  }

  /**
   * Retour à l'accueil (annule l'authentification)
   */
  cancel(): void {
    this.router.navigate(['/']);
  }

  /**
   * Obtient le titre selon le contexte
   */
  getTitle(): string {
    switch(this.context) {
      case 'quiz': return 'Voir ton score';
      case 'admin': return 'Connexion Administrateur';
      default: return 'Connexion';
    }
  }

  /**
   * Obtient le message selon le contexte
   */
  getMessage(): string {
    switch(this.context) {
      case 'quiz': return 'Connecte-toi pour découvrir ton score et accéder à ton historique';
      case 'admin': return 'Accède au panneau d\'administration';
      default: return 'Connecte-toi à ton compte';
    }
  }
}
