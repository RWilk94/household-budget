import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localePl, 'pl');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
