import { IUser } from '../core/models/users-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  private apiURL = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAll(): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(this.apiURL + '/users')
      .pipe(catchError(this.errorHandler));
  }

  create(user: IUser): Observable<IUser> {
    return this.httpClient
      .post<any>(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<IUser> {
    return this.httpClient
      .get<IUser>(this.apiURL + '/users/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: IUser): Observable<IUser> {
    return this.httpClient
      .put<any>(
        this.apiURL + '/users/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<IUser>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
