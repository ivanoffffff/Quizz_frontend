import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  email = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.checkAdmin(this.email).subscribe({
      next: (isAdmin) => {
        this.loading = false;
        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = 'Accès refusé. Vous n\'êtes pas administrateur.';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur lors de la vérification:', error);
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
      }
    });
  }
}
