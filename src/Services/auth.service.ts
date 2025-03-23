import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Modeles/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  constructor(private http: HttpClient) {}

  // Méthode pour se connecter et récupérer le token JWT
  login(user: User): Observable<any> {
    return this.http.post<any>('https://localhost:7163/api/Account/login', user);
  }

  // Méthode pour stocker le token JWT et autres informations (comme panier, rôle, etc.)
  setSession(token: string, userRole: string, panierId: number): void {
    localStorage.setItem('jwt', token); // Sauvegarde du token dans localStorage
    localStorage.setItem('role', userRole);
    localStorage.setItem('panierId', panierId.toString());
  }

  // Méthode pour supprimer le token JWT et les informations utilisateur (logout)
  logout(): void {
    localStorage.removeItem('jwt'); // Suppression du token
    localStorage.removeItem('user'); // Suppression des informations utilisateur
  }

  // Méthode pour récupérer le token JWT depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour récupérer les informations utilisateur depuis le localStorage
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Récupère et parse les informations utilisateur
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.getToken() !== null; // Si le token est présent, l'utilisateur est authentifié
  }
}
