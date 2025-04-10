import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';  // Ajouter ActivatedRoute ici
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
  
  message: string = '';  // Stocke le message passé dans l'URL


  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });

   // Récupérer le message de l'URL si disponible
   this.route.queryParams.subscribe(params => {
    if (params['message']) {
      this.message = params['message'];  // Mettre à jour le message
    }
  });
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
            localStorage.setItem('role', response.role);  // Stocke le rôle
            
          } else {
            sessionStorage.setItem('jwt', response.token);
            localStorage.setItem('panierId',response.panierId);
            localStorage.setItem('role', response.role);  // Stocke le rôle
          }
          
          // Redirection et mise à jour des données
          console.log(response.token);
          console.log('Token décodé:', this.authService.decodeToken());
          console.log('Rolelocal:', response.role);  
          console.log('user',response.panierId);
          console.log('decode',this.authService.getUserIdFromToken())
          console.log('role',this.authService.getUserroleFromToken())
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
