
import {throwError as observableThrowError, BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, finalize, map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class HTTPStatusService {

  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
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
    return next.handle(request).pipe(
      finalize(() => this.status.setHttpStatus(false))
    );
  }

}
