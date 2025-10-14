import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import {PanelAdminComponent} from "./panel-admin/panel-admin.component";
import { QuizComponent } from './quiz-page/quiz/quiz.component';
import { AuthComponent } from './auth/auth.component';
import { ResultComponent } from './quiz-page/result/result.component';
import { QuizFinishedComponent } from "./quiz-page/quiz-finished/quiz-finished.component"

const routes: Routes = [

  { path: "quiz", component: HomeComponent },
  { path: "admin", component: PanelAdminComponent},
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'quiz-finished', component: QuizFinishedComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'result', component: ResultComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
