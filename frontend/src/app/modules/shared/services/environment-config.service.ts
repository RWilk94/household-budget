import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export interface EnvConfig {
  backendUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  private backendUrl = '';

  constructor(private http: HttpClient) { }

  getBackendUrl(): string {
    return this.backendUrl;
  }

  load() {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<EnvConfig>(environment.appConfigUrl)
        .toPromise()
        .then(config => {
          this.backendUrl = config.backendUrl;
          resolve(true);
        }, error => console.log(error));
    });
  }

}
