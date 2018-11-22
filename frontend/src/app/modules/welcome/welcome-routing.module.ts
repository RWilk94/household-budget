import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {StartComponent} from "./components/start/start.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'register', component: RegistrationComponent},
      {path: 'login', component: LoginComponent},
      {path: '', component: StartComponent},
      {path: '**', component: StartComponent}
    ]
  },
  {path: '**', component: StartComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
