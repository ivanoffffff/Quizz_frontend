import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from "../../models";

@Component({
  selector: 'app-admin-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.scss']
})
export class AdminCreateUserComponent {
  newAdmin: User = {
    name: '',
    email: '',
    role: 'admin'
  };

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Validation
    if (!this.newAdmin.name || !this.newAdmin.email) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (!this.isValidEmail(this.newAdmin.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.create(this.newAdmin).subscribe({
      next: (createdUser) => {
        this.loading = false;
        this.successMessage = `✅ Administrateur ${createdUser.name} créé avec succès !`;

        // Réinitialiser le formulaire après 2 secondes et rediriger
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur lors de la création:', error);

        if (error.status === 409 || error.error?.message?.includes('duplicate')) {
          this.errorMessage = '⚠️ Cet email est déjà utilisé';
        } else {
          this.errorMessage = '❌ Erreur lors de la création de l\'administrateur';
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
