
import {throwError as observableThrowError, BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, finalize, map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class HTTPStatusService {

  private requestInFlight$: BehaviorSubject<boolean>;
  private requests = 0;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    if (inFlight === true) {
      this.requests += 1;
      this.requestInFlight$.next(inFlight);
    } else {
      this.requests -= 1;
      if (this.requests === 0) {
        this.requestInFlight$.next(inFlight);
      }
    }
  }

  resetHttpStatus(status: boolean) {
    this.requestInFlight$.next(status);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }

}

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private status: HTTPStatusService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.status.setHttpStatus(false);
      }
    }, (error: any) => {
      this.status.resetHttpStatus(false);
    }));
  }

}
