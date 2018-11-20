import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
// import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {StartComponent} from "./components/start/start.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SharedModule} from "../shared/shared.module";
import {RegistrationService} from "./services/registration.service";
import {WelcomeRoutingModule} from "./welcome-routing.module";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {CommonModule} from "@angular/common";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    SharedModule,
    // BrowserModule,
    // BrowserAnimationsModule,
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
  providers: [
    RegistrationService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WelcomeModule {
}
