import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Result } from "../models";

@Injectable({
  providedIn: "root",
})
export class ResultService {
  private resultsUrl = "http://localhost:8080/api/results";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Result[]> {
    return this.http.get<Result[]>(this.resultsUrl);
  }

  findByUserId(userId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.resultsUrl}/user/${userId}`);
  }

  getLeaderboard(quizId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.resultsUrl}/leaderboard/${quizId}`);
  }

  create(userId: number, quizId: number, score: number): Observable<Result> {
    const payload = { userId, quizId, score };
    return this.http.post<Result>(this.resultsUrl, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resultsUrl}/${id}`);
  }
}
