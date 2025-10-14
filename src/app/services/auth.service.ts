import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { User } from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private userService: UserService) {}

  /**
   * Vérifie si un utilisateur existe avec cet email
   * Si oui, le connecte
   * Sinon, crée un nouvel utilisateur
   */
  loginOrRegister(email: string, name: string): Observable<User> {
    return this.userService.findAll().pipe(
      switchMap(users => {
        // Cherche si l'email existe déjà
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
          // L'utilisateur existe, on le connecte
          this.currentUser = existingUser;
          return of(existingUser);
        } else {
          // L'utilisateur n'existe pas, on le crée
          const newUser: User = {
            name: name,
            email: email,
            role: 'player'
          };
          return this.userService.create(newUser).pipe(
            map(createdUser => {
              this.currentUser = createdUser;
              return createdUser;
            })
          );
        }
      })
    );
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.currentUser = null;
  }

  /**
   * Vérifie si un utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
