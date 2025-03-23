import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});  
  loggedInUser: any = null;  
  errorMessage: string = '';  // Stocke les erreurs d’authentification

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });

    // Vérifier si un utilisateur est déjà connecté
    this.loggedInUser = this.authService.getUser();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';  // Réinitialise l'erreur
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          // Stockage sécurisé du token et de l'utilisateur
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('jwt', response.token);
            localStorage.setItem('panierId',response.panierId);
            
          } else {
            sessionStorage.setItem('jwt', response.token);
            localStorage.setItem('panierId',response.panierId);
         
          }

          // Redirection et mise à jour des données
          console.log(response.token);
          console.log('user',response.panierId);
          console.log()
          this.loggedInUser = response.user;
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}
