import { Component, OnInit } from '@angular/core';
import { Article } from 'src/Modeles/Article';
import { CartService } from 'src/Services/cart.service';
import { ArticleService } from 'src/Services/article.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  articles: Article[] = []; // Liste des articles
  quantities: { [key: string]: number } = {}; // Dictionnaire des quantités par article

  constructor(private AS: ArticleService, private CS: CartService,private authS: AuthService) {}

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
    let quantity = this.quantities[article.idart.toString()];
    // Convertir la quantité en nombre (en cas de chaîne de caractères)
    quantity = Number(quantity);
  
    // Vérifiez que la quantité est valide (supérieure à 0)
    if (!quantity || quantity <= 0) {
      console.error('La quantité doit être supérieure à zéro');
      return;
    }
  
    // Créez l'objet LignePanierDTO à envoyer au backend
    const panierDTO = {
      idPanier: this.getIdPanier(), // ID du panier
      qte: quantity, // Quantité choisie par l'utilisateur
      idart: article.idart, // ID de l'article
      prixUnitaire: article.prix,
      prixTotalLg: article.prix * quantity
    }

    console.log("Données envoyées :", panierDTO);
    
    // Récupérer le token JWT et l'ID de l'utilisateur
    const token = this.authS.getToken(); // Récupérer le token JWT
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.CS.addToCart(panierDTO, { headers }).subscribe(
      () => {
        console.log('Article ajouté au panier avec succès');
        console.log(this.authS.getUserIdFromToken())
      },
      (error) => {
        console.error('Erreur lors de l\'ajout au panier:', error);
      }
    );
  }

  
}
