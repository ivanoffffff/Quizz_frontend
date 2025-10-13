import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import {PanelAdminComponent} from "./panel-admin/panel-admin.component";

const routes: Routes = [

  { path: "quiz", component: HomeComponent },

  { path: "admin", component: PanelAdminComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
