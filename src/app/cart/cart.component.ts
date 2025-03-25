import { Component, OnInit } from '@angular/core';
import { ArticlePanier } from 'src/Modeles/ArticlePanier';
import { CartService } from 'src/Services/cart.service';
import { AuthService } from 'src/Services/auth.service';
import { Cart } from 'src/Modeles/Cart';  // Assurez-vous que l'interface Cart est importée
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] =  [
    
  ]; // Stocke les articles du panier
  userId: string | null = null; // Stocke l'ID de l'utilisateur
  cartTotal: number = 0;
  constructor(private CS: CartService, private authService: AuthService,private AS:ArticleService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    this.loadCartItems();
    this.getCartTotal();
  }

  // Récupérer les articles du panier depuis le backend
  loadCartItems() {
    console.log(this.userId); // Affiche l'ID utilisateur pour vérifier s'il est récupéré
    if (this.userId) {
      this.CS.getCartItems(this.userId).subscribe(
        (data: any) => {
          this.cartItems = data;
          console.log(this.cartItems); // Vérifiez les articles du panier
  
          // Récupérer les détails des articles pour chaque item
          this.cartItems.forEach(item => {
            // Appeler l'API pour récupérer les détails de l'article par son idart
            this.AS.getArticleDetails(item.idart).subscribe(
              (articleDetails: any) => {
                // Ajouter les détails de l'article à l'item (par exemple, imageUrl et titleart)
                item.imageUrl = articleDetails.imageUrl;
                item.titleart = articleDetails.titleart;
                // Vous pouvez également ajouter d'autres détails nécessaires ici
              },
              (error) => {
                console.error("Erreur lors de la récupération des détails de l'article :", error);
              }
            );
          });
        },
        (error) => {
          console.error("Erreur lors de la récupération des items :", error);
        }
      );
    } else {
      console.warn("Utilisateur non authentifié.");
    }
  }
  
  
  getCartTotal() {
    this.CS.getCartTotal(this.userId).subscribe(
      (response) => {
        this.cartTotal = response.prixTotal; // Récupérer le prix total du panier
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier', error);
      }
    );
  
  }
}
