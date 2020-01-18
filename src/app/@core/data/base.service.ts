import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class BaseService {

  constructor() {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console instead
      console.error(error);
      // console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
