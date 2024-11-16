import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly tokenService: TokenService) { }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.tokenService.validateAccessToken().pipe(
      map((resp) => resp),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
function next(resp: boolean) {
  throw new Error('Function not implemented.');
}

