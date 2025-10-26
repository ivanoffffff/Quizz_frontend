import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component";
import { QuizComponent } from './quiz-page/quiz/quiz.component';
import { AuthComponent } from './auth/auth.component';
import { ResultComponent } from './quiz-page/result/result.component';
import { QuizFinishedComponent } from "./quiz-page/quiz-finished/quiz-finished.component";
import { AdminQuizListComponent } from './admin/admin-quiz-list/admin-quiz-list.component';
import { AdminQuizFormComponent } from './admin/admin-quiz-form/admin-quiz-form.component';
import { AdminQuestionManagerComponent } from './admin/admin-question-manager/admin-question-manager.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { adminGuard } from "./guards/admin.guards";
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';



const routes: Routes = [

  { path: "", redirectTo: "quiz", pathMatch: "full" },

  { path: "quiz", component: HomeComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'quiz-finished', component: QuizFinishedComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'result', component: ResultComponent },

  { path: 'admin/login', component: AdminLoginComponent },

  // Routes admin (protégées par le guard)
  { path: "admin", component: AdminQuizListComponent, canActivate: [adminGuard] },
  { path: 'admin/quizzes', component: AdminQuizListComponent, canActivate: [adminGuard] },
  { path: 'admin/quiz/new', component: AdminQuizFormComponent, canActivate: [adminGuard] },
  { path: 'admin/quiz/edit/:id', component: AdminQuizFormComponent, canActivate: [adminGuard] },
  { path: 'admin/quiz/:quizId/questions', component: AdminQuestionManagerComponent, canActivate: [adminGuard] },
  { path: 'admin/create-user', component: AdminCreateUserComponent, canActivate: [adminGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
