import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Aquí podrías agregar una lógica para verificar si el token es válido, por ejemplo, con su fecha de expiración
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
