(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {

  /***/ "./src/$$_lazy_route_resource lazy recursive":
  /*!**********************************************************!*\
    !*** ./src/$$_lazy_route_resource lazy namespace object ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };
    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

    /***/
  }),

  /***/ "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/
  /*! exports provided: AppRoutingModule */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
    /* harmony import */
    var _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/registration/registration.component */ "./src/app/components/registration/registration.component.ts");
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };


    var routes = [
      {path: '', component: _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_2__["RegistrationComponent"]}
    ];
    var AppRoutingModule = /** @class */ (function () {
      function AppRoutingModule() {
      }

      AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
      ], AppRoutingModule);
      return AppRoutingModule;
    }());


    /***/
  }),

  /***/ "./src/app/app.component.css":
  /*!***********************************!*\
    !*** ./src/app/app.component.css ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = ""

    /***/
  }),

  /***/ "./src/app/app.component.html":
  /*!************************************!*\
    !*** ./src/app/app.component.html ***!
    \************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "<router-outlet></router-outlet>\r\n\r\n"

    /***/
  }),

  /***/ "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/
  /*! exports provided: AppComponent */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var AppComponent = /** @class */ (function () {
      function AppComponent() {
        this.title = 'Household budget';
      }

      AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
          selector: 'app-root',
          template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
          styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
      ], AppComponent);
      return AppComponent;
    }());


    /***/
  }),

  /***/ "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/
  /*! exports provided: AppModule */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */
    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
    /* harmony import */
    var _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/registration/registration.component */ "./src/app/components/registration/registration.component.ts");
    /* harmony import */
    var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
    /* harmony import */
    var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
    /* harmony import */
    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };


    var AppModule = /** @class */ (function () {
      function AppModule() {
      }

      AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
          declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_3__["RegistrationComponent"]
          ],
          imports: [
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"]
          ],
          providers: [],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
      ], AppModule);
      return AppModule;
    }());


    /***/
  }),

  /***/ "./src/app/components/registration/registration.component.css":
  /*!********************************************************************!*\
    !*** ./src/app/components/registration/registration.component.css ***!
    \********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = ".red {\r\n  background: url('background.png') no-repeat;\r\n  background-size: cover;\r\n  min-width: 100vw;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.blue {\r\n  background: dodgerblue;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.white {\r\n  padding: 24px;\r\n  position: relative;\r\n  display: compact;\r\n  background: white;\r\n  min-width: 400px;\r\n  min-height: 400px;\r\n  horiz-align: center;\r\n  border-radius: 3px;\r\n}\r\n\r\n.mat-input-form {\r\n  width: 100%;\r\n}\r\n\r\n@media screen and (max-device-width: 768px){\r\n\r\n  .white {\r\n    min-width: 0;\r\n    min-height: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 24px;\r\n  }\r\n}\r\n"

    /***/
  }),

  /***/ "./src/app/components/registration/registration.component.html":
  /*!*********************************************************************!*\
    !*** ./src/app/components/registration/registration.component.html ***!
    \*********************************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "<div class=\"red\">\r\n  <div class=\"white\">\r\n    <div class=\"text-center\">\r\n      <h3 class=\"font-weight-bold\">\r\n        <strong>SIGN UP</strong>\r\n      </h3>\r\n    </div>\r\n    <br>\r\n\r\n    <form [formGroup]=\"registrationForm\" #form=\"ngForm\">\r\n      <mat-form-field class=\"mat-input-form\">\r\n        <input matInput\r\n               placeholder=\"Username\"\r\n               formControlName=\"username\"\r\n               required>\r\n        <mat-error *ngIf=\"registrationForm.get('username').hasError\">{{getUsernameErrorMessage()}}\r\n        </mat-error>\r\n      </mat-form-field>\r\n      <br>\r\n      <mat-form-field class=\"mat-input-form\">\r\n        <input matInput\r\n               placeholder=\"Email\"\r\n               formControlName=\"email\"\r\n               required>\r\n        <mat-error *ngIf=\"registrationForm.get('email').hasError\">{{getEmailErrorMessage()}}</mat-error>\r\n      </mat-form-field>\r\n      <br>\r\n      <mat-form-field class=\"mat-input-form\">\r\n        <input matInput\r\n               placeholder=\"Password\"\r\n               formControlName=\"password\"\r\n               type=\"password\"\r\n               required>\r\n        <mat-error *ngIf=\"registrationForm.get('password').hasError\">{{getPasswordErrorMessage()}}\r\n        </mat-error>\r\n      </mat-form-field>\r\n      <br>\r\n      <mat-form-field class=\"mat-input-form\">\r\n        <input matInput\r\n               placeholder=\"Confirm password\"\r\n               formControlName=\"confirmPassword\"\r\n               type=\"password\"\r\n               required>\r\n        <mat-error *ngIf=\"registrationForm.get('confirmPassword').hasError\">\r\n          {{getConfirmPasswordErrorMessage()}}\r\n        </mat-error>\r\n      </mat-form-field>\r\n      <br><br>\r\n      <button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\">Sign up</button>\r\n    </form>\r\n\r\n    <br>\r\n    <div class=\"col-md-12\">\r\n      <p class=\"font-small white-text d-flex justify-content-end\">Have an account?\r\n        <a href=\"#\" class=\"ml-1 font-weight-bold\"> Sign in</a>\r\n      </p>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n"

    /***/
  }),

  /***/ "./src/app/components/registration/registration.component.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/components/registration/registration.component.ts ***!
    \*******************************************************************/
  /*! exports provided: RegistrationComponent */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function () {
      return RegistrationComponent;
    });
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
    /* harmony import */
    var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
    /* harmony import */
    var _validators_custom_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../validators/custom-validators */ "./src/app/validators/custom-validators.ts");
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };


    var RegistrationComponent = /** @class */ (function () {
      function RegistrationComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"]();
      }

      RegistrationComponent.prototype.ngOnInit = function () {
        this.registrationForm = this.formBuilder.group({
          username: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.user.username, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
          email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.user.email, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]),
          password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.user.password, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
          confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.user.confirmPassword, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _validators_custom_validators__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].confirmPassword])
        });
      };
      RegistrationComponent.prototype.getUsernameErrorMessage = function () {
        return this.registrationForm.get('username').hasError('required') ? 'Username can not be empty.' : '';
      };
      RegistrationComponent.prototype.getEmailErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'Email can not be empty.' :
            'Email has invalid format.';
      };
      RegistrationComponent.prototype.getPasswordErrorMessage = function () {
        return this.registrationForm.get('password').hasError('required') ? 'Password can not be empty.' : '';
      };
      RegistrationComponent.prototype.getConfirmPasswordErrorMessage = function () {
        return this.registrationForm.get('confirmPassword').hasError('required')
            ? 'Confirm password can not be empty.' :
            this.registrationForm.get('confirmPassword').hasError('confirmPassword')
                ? 'Password and confirm password must be the same.' :
                '';
      };
      RegistrationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
          selector: 'app-registration',
          template: __webpack_require__(/*! ./registration.component.html */ "./src/app/components/registration/registration.component.html"),
          styles: [__webpack_require__(/*! ./registration.component.css */ "./src/app/components/registration/registration.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
      ], RegistrationComponent);
      return RegistrationComponent;
    }());


    /***/
  }),

  /***/ "./src/app/models/user.ts":
  /*!********************************!*\
    !*** ./src/app/models/user.ts ***!
    \********************************/
  /*! exports provided: User */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "User", function () {
      return User;
    });
    var User = /** @class */ (function () {
      function User() {
      }

      return User;
    }());


    /***/
  }),

  /***/ "./src/app/validators/custom-validators.ts":
  /*!*************************************************!*\
    !*** ./src/app/validators/custom-validators.ts ***!
    \*************************************************/
  /*! exports provided: CustomValidators */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "CustomValidators", function () {
      return CustomValidators;
    });
    var CustomValidators = /** @class */ (function () {
      function CustomValidators() {
      }

      CustomValidators.confirmPassword = function (control) {
        if (control && control.value !== null || control.value !== undefined) {
          var confirmPasswordValue = control.value;
          var passControl = control.root.get('password');
          if (passControl) {
            var passwordValue = passControl.value;
            if (passwordValue !== confirmPasswordValue || passwordValue === '') {
              return {
                confirmPassword: true,
                isError: true
              };
            }
          }
        }
        return null;
      };
      return CustomValidators;
    }());


    /***/
  }),

  /***/ "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/
  /*! exports provided: environment */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
    var environment = {
      production: false
    };
    /*
     * In development mode, to ignore zone related error stack frames such as
     * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
     * import the following file, but please comment it out in production mode
     * because it will have performance impact when throw error
     */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


    /***/
  }),

  /***/ "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/
  /*! no exports provided */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
    /* harmony import */
    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");


    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(function (err) {
          return console.log(err);
        });


    /***/
  }),

  /***/ 0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

    module.exports = __webpack_require__(/*! C:\Users\rawi\IdeaProjects\household-budget\frontend\src\main.ts */"./src/main.ts");


    /***/
  })

}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main.js.map