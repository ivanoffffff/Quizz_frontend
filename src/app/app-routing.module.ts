import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component";
import { QuizComponent } from './quiz-page/quiz/quiz.component';
import { AuthComponent } from './auth/auth.component';
import { ResultComponent } from './quiz-page/result/result.component';
import { QuizFinishedComponent } from "./quiz-page/quiz-finished/quiz-finished.component";
import { AdminQuizListComponent } from './admin/admin-quiz-list/admin-quiz-list.component';
import { AdminQuizFormComponent } from './admin/admin-quiz-form/admin-quiz-form.component';


const routes: Routes = [

  { path: "", redirectTo: "quiz", pathMatch: "full" },

  { path: "quiz", component: HomeComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'quiz-finished', component: QuizFinishedComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'result', component: ResultComponent },

  { path: "admin", component: AdminQuizListComponent },

  { path: 'admin/quizzes', component: AdminQuizListComponent },

  { path: 'admin/quiz/new', component: AdminQuizFormComponent },

  { path: 'admin/quiz/edit/:id', component: AdminQuizFormComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
