import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
// import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {StartComponent} from "./components/start/start.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SharedModule} from "../shared/shared.module";
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    StartComponent,
    ToolbarComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WelcomeModule {
}
