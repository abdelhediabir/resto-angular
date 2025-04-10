import { Component, OnInit } from '@angular/core';
import { Article } from 'src/Modeles/Article';
import { CartService } from 'src/Services/cart.service';
import { ArticleService } from 'src/Services/article.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/Services/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  articles: Article[] = []; // Liste des articles
  quantities: { [key: string]: number } = {}; // Dictionnaire des quantités par article

  constructor(private AS: ArticleService,
     private CS: CartService,
     private authS: AuthService,
     private router: Router,
       ) {}

  ngOnInit(): void {
    this.fetchData(); // Récupérer les articles au chargement du composant
    const panierId = localStorage.getItem('panierId');
    console.log("Panier ID:", panierId);
  }

  // Fonction pour récupérer tous les articles
  fetchData() {
    this.AS.GetAllArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    );
  }

  // Fonction pour récupérer l'ID du panier depuis le localStorage
  getIdPanier(): number {
    const panierId = localStorage.getItem('panierId');
    return panierId ? +panierId : 0; // Retourner l'ID du panier ou 0 si non trouvé
  }

  // Fonction pour ajouter un article au panier
  addToCart(article: Article) {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authS.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { message: 'Veuillez vous connecter pour ajouter un article au panier.' } });
      return;
    }
  
    let quantity = Number(this.quantities[article.idart.toString()]);
    if (!quantity || quantity <= 0) {
      alert("La quantité doit être supérieure à zéro");
      return;
    }
  
    const panierDTO = {
      idPanier: this.getIdPanier(),
      qte: quantity,
      idart: article.idart,
      prixUnitaire: article.prix,
      prixTotalLg: article.prix * quantity
    };
  
    const token = this.authS.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  
    this.CS.addToCart(panierDTO, { headers }).subscribe(
      () => {
        alert("Article ajouté au panier avec succès !");
      },
      (error) => {
        if (error.status === 401) {
          // Token expiré ou non valide
          alert("Votre session est terminée. Veuillez vous reconnecter.");
          this.authS.logout();  // Déconnecter l'utilisateur si nécessaire
          this.router.navigate(['/login'], { queryParams: { message: 'Votre session est terminée, reconnectez-vous.' } });
        } else {
          alert("Erreur lors de l'ajout au panier !");
          console.error(error);
        }
      }
    );
  }
  
  
  
  
  
}
