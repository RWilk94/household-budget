import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {StartComponent} from "./components/start/start.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {ToasterModule} from "angular2-toaster";

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    ToasterModule.forRoot(),
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
