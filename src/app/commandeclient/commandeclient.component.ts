import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/Modeles/Commande';
import { AuthService } from 'src/Services/auth.service';
import { CommandeService } from 'src/Services/commande.service';

@Component({
  selector: 'app-commandeclient',
  templateUrl: './commandeclient.component.html',
  styleUrls: ['./commandeclient.component.css']
})
export class CommandeclientComponent {

  constructor(private authService:AuthService,private router: Router,private commandeService:CommandeService){}
  commandes:Commande[]=[];
  ngOnInit(): void {
    //this.mesCommandes()
    this.getAllCommandes()
  }
  mesCommandes() {
    const token = this.authService.getToken();
    if (!token) {
      // Si le token est manquant, afficher une erreur ou rediriger l'utilisateur vers la page de connexion
      alert('Utilisateur non authentifié. Veuillez vous connecter.');
      this.router.navigate(['/login']); // Redirection vers la page de connexion
      return; // Sortir de la méthode si le token est manquant
    }
  
    // Si le token est présent, ajouter les en-têtes avec le token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Appel du service pour récupérer les commandes
    this.commandeService.commandesClient(headers).subscribe(
      (response) => {
        // Traitement des données de la réponse
        console.log('Commandes récupérées:', response);
        // Vous pouvez ici stocker les données dans une variable ou les afficher dans l'interface
        //this.commandes = response; // Par exemple, en affectant les commandes à une variable locale
        this.commandes =response
      console.log('table',this.commandes)},
      (error) => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des commandes:', error);
        alert('Une erreur s\'est produite lors de la récupération des commandes.');
      }
    );
  }
  getAllCommandes() {
    const token = this.authService.getToken();
    if (!token) {
      alert('Utilisateur non authentifié. Veuillez vous connecter.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.commandeService.getAllCommandes(headers).subscribe(
      (response) => {
        this.commandes = response; // Assigner les données reçues dans 'commandes'
        console.log('Commandes récupérées:', this.commandes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
        alert('Une erreur s\'est produite lors de la récupération des commandes.');
      }
    );
  }


}
