import { CustomResponse } from './../interface/custom-response';
import { Status } from './../enum/status.enum';
import { Server } from './../interface/server';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, tap, observable, Subscriber } from 'rxjs';
//import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // // procedural approach
  // getServers(): Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>('http://localhost:8080/server/list');
  // }

  // reactive approach
  servers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`) //$ to indicate observables
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server) //$ to indicate observables
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/pint/${ipAddress}`) //$ to indicate observables
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      Subscriber => {
        console.log(response);
        Subscriber.next(
          status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status`} : 
          {
            ...response,
            message: response.data.servers
            .filter(server => server.status === status).length > 0 ? `Servers filtered by 
            ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status` : `No servers of ${status} found`,
            data: { servers: response.data.servers
              .filter(server => server.status === status) }
          }
        );
        Subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`) //$ to indicate observables
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(() => new Error(`An error occurred - Error code: ${error.status}`));
  }
}
