import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private questionsUrl = "http://localhost:8080/api/questions";

  constructor(private http: HttpClient) {}

  findByQuizId(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}/quiz/${quizId}`);
  }

  findById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.questionsUrl}/${id}`);
  }

  create(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question);
  }

  update(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionsUrl}/${id}`, question);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.questionsUrl}/${id}`);
  }
}
