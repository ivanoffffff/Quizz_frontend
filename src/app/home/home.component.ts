import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {QuizService} from "../services/quiz.service";
import { Quiz } from "../models"

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {}
  hoverState: { [key: string]: boolean } = {};

  ngOnInit(): void {

    this.quizService.findAll().subscribe(data => {
      this.quizzes = data;

      this.quizzes.forEach(quiz => {
        this.hoverState[quiz.quizId!] = false;
      });
    });
  }

  startQuiz(quizId: number): void {
    // Redirection vers la page du quiz
    this.router.navigate(['/quiz', quizId]);
  }

  openQuiz(quiz: Quiz): void {
    if (quiz.quizId) {
      this.router.navigate(['/quiz', quiz.quizId]);
    }
  }
}

