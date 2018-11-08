import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AppRoutingModule} from "./app-routing.module";
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {RegistrationService} from "./services/registration.service";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    StartComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    //MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [
    RegistrationService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
