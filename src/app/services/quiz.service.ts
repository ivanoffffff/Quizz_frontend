import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Quiz } from "../models/quiz.model";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private quizzesUrl = "http://localhost:8080/api/quizzes";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesUrl);
  }

  findById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.quizzesUrl}/${id}`);
  }

  create(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizzesUrl, quiz);
  }

  update(id: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.quizzesUrl}/${id}`, quiz);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.quizzesUrl}/${id}`);
  }
}
