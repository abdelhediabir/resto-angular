import { Component, OnInit } from '@angular/core';
import { Article } from 'src/Modeles/Article';
import { ArticlePanier } from 'src/Modeles/ArticlePanier';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  articles: Article[] = []; // Liste des articles
  quantities: { [key: string]: number } = {}; // Dictionnaire des quantités par article

  constructor(private AS: ArticleService) {}

  ngOnInit(): void {
    this.fetchData(); // Récupérer les articles au chargement du composant
    const panierId = localStorage.getItem('panierId');
    console.log("Panier ID:", panierId);
  }

  fetchData() {
    this.AS.GetAllArticles().subscribe(
      (data) => {
        this.articles = data;
        // Initialiser la quantité par défaut à 1 pour chaque article
        this.articles.forEach(article => {
          // Utiliser article.idart.toString() pour la clé
          this.quantities[article.idart.toString()] = 1;
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    );
  }

  getIdPanier(): number {
    const panierId = localStorage.getItem('panierId');
    return panierId ? +panierId : 0; // Retourner l'ID du panier ou 0 si non trouvé
  }

  addToArticle(article: Article) {
    const quantity = this.quantities[article.idart.toString()]; // Récupérer la quantité sélectionnée pour l'article
    const panier: ArticlePanier = {
      IdPanier: this.getIdPanier(), // Utilisation de l'ID du panier récupéré du localStorage
      Qte: quantity, // Quantité à ajouter
      Idart: article.idart, // L'ID de l'article
      PrixUnitaire: article.prix, // Le prix unitaire de l'article
      PrixTotalLg: article.prix * quantity // Le prix total (prix unitaire * quantité)
    };
    console.log(panier);
    // Ajoutez ici la logique pour ajouter l'article au panier, par exemple en l'envoyant à votre backend
  }
}
