import { inject, Injectable } from '@angular/core';
import { AuthStatus, LoginBody, LoginRes, MakeUser, User, UserRes } from '../interfaces/auth.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ENV } from '../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Res } from '../../shared/interfaces/res.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth_url: string = `${ENV.API_URL}/auth`;
  private readonly user_url: string = `${ENV.API_URL}/user`;

  private httpClient = inject(HttpClient);

  private _token: string|null = null;
  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  private authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.Checking);

  public user$: Observable<User|null> = this.user.asObservable();
  public authStatus$: Observable<AuthStatus> = this.authStatus.asObservable();

  constructor() { }

  public login(body: LoginBody): Observable<boolean> {
    const url: string = `${this.auth_url}/login`;
    return this.httpClient.post<LoginRes>(url, body, {
      withCredentials: true
    }).pipe(
      map(({ access_token }) => {
        this._token = access_token;
        this.authStatus.next(AuthStatus.Authenticated);
        return true;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public logout(): Observable<boolean> {
    this.user.next(null);
    this._token = null;
    this.authStatus.next(AuthStatus.NotAuthenticated);
    const url: string = `${this.auth_url}/logout`;
    return this.httpClient.post<Res>(url, {}, {
      withCredentials: true
    }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<UserRes>(this.user_url).pipe(
      map(({ user }) => {
        this.user.next(user);
        return user;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public createUser({ type, ...data }: MakeUser): Observable<boolean> {
    let url: string = `${this.user_url}/${type === 'admin' ? 'ADMIN' : 'CLIENT'}`;
    return this.httpClient.post<Res>(url, data).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public getUserByEmail(email: string): Observable<User> {
    const url: string = `${this.user_url}/email/${email}`;
    return this.httpClient.get<UserRes>(url).pipe(
      map(({ user }) => user),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public refreshToken(): Observable<void> {
    const url: string = `${this.auth_url}/refresh-token`;
    return this.httpClient.post<LoginRes>(url, {}, {
      withCredentials: true
    }).pipe(
      map(({ access_token }) => {
        this._token = access_token;
        this.authStatus.next(AuthStatus.Authenticated);
      }),
      catchError((error: HttpErrorResponse) => {
        this.authStatus.next(AuthStatus.NotAuthenticated)
        return throwError(() => error)
      })
    );
  }

  public rememberPin(email: string): Observable<boolean> {
    const url: string = `${this.auth_url}/remember-pin`;
    return this.httpClient.post<Res>(url, { email }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    )
  }

  public checkStatus(): Observable<void> {
    return this.refreshToken().pipe(
      catchError(() => of())
    );
  }

  get token(): string | null {
    return this._token;
  }

}
