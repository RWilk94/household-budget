import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
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
      map(event => {
        this.status.setHttpStatus(true);
        return event;
      }),
      catchError(error => {
        return Observable.throw(error())
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }

}
