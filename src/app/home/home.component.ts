import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Quiz, QuizService} from "../services/quiz.service";

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

    this.quizzes.forEach(quiz => {
      this.hoverState[quiz.id] = false;
    });

    this.quizService.getAllQuizzes().subscribe(data => {
      this.quizzes = data;
    });
  }

  startQuiz(quizId: number): void {
    // Redirection vers la page du quiz
    this.router.navigate(['/quiz', quizId]);
  }

  openQuiz(quiz: Quiz) {

  }
}

