import { Component, OnInit } from '@angular/core';
import { ArticlePanier } from 'src/Modeles/ArticlePanier';
import { CartService } from 'src/Services/cart.service';
import { AuthService } from 'src/Services/auth.service';
import { Cart } from 'src/Modeles/Cart';  // Assurez-vous que l'interface Cart est importée
import { ArticleService } from 'src/Services/article.service';
import { CommandeService } from 'src/Services/commande.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
  panierId=localStorage.getItem('panierId');
  constructor(private CS: CartService, private authService: AuthService,private AS:ArticleService,
    private commandeService:CommandeService,private router: Router,
  ) {}

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
        console.log(this.cartTotal)
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier', error);
      }
    );
  
  }
  removeItemCart(articleId: any) {
    this.CS.removeItem(this.panierId, articleId).subscribe({
      next: (response) => {
        console.log('Article supprimé:', response);
        
        this.loadCartItems();  // Recharge les articles du panier
        this.getCartTotal();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
      }
    });
  }
  modifierQuantite(item: any, changement: number) {
    let nouvelleQte = item.qte + changement;
  
    // Empêcher la quantité de devenir négative
    if (nouvelleQte < 1) return;
  
    // Calculer le prix total de la ligne
    let prixTotalLg = item.prixUnitaire * nouvelleQte;
  
    // Créer l'objet panier avec les nouvelles données
    let panier = {
      idPanier: this.panierId,
      idart: item.idart,
      qte: nouvelleQte,
      prixUnitaire: item.prixUnitaire,
      prixTotalLg: prixTotalLg
    };
  
    // Appeler le service pour modifier la quantité
    this.CS.modifierQte(panier).subscribe({
      next: (response) => {
        console.log(response.Message);
        item.qte = nouvelleQte; // Mettre à jour la quantité localement
        item.prixTotalLg = prixTotalLg; // Mettre à jour le prix total de la ligne
        this.updateTotalPanier(); // Mettre à jour le total du panier
      },
      error: (error) => {
        console.error("Erreur lors de la modification de la quantité :", error);
      }
    });
  }
  
  updateTotalPanier() {
    // Calculer le prix total du panier en additionnant les prix de chaque article
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.prixTotalLg;
    });
  
    // Mettre à jour le total du panier dans l'interface utilisateur
    this.cartTotal = total;
    console.log("Total du panier mis à jour : ", this.cartTotal);
  }
  passerCommande() {
    // Récupérer le token du localStorage
    const token = this.authService.getToken();
    console.log(token);

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

    // Appeler la méthode pour passer la commande, en envoyant les en-têtes
    this.commandeService.passerCommande(headers).subscribe({
      next: (response) => {
        console.log('Commande passée avec succès:', response);
        this.loadCartItems()
      },
      error: (error) => {
        console.error('Erreur lors de la commande:', error);
        alert('Une erreur s\'est produite lors du traitement de la commande.');
      }
    });
  }
  
  
  
  
}
