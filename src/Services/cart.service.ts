import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePanier } from 'src/Modeles/ArticlePanier';
import { AuthService } from './auth.service';
import { Cart } from 'src/Modeles/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  getCartItems(id:any): Observable<any> {
    return this.http.get<any>(`https://localhost:7163/api/Panier/GetlignePanier?userId=${id}`);
  }
  addToCart(panierDTO: any, options: any): Observable<any> {
    const url = 'https://localhost:7163/api/Panier/AddOrUpdateArticleInPanier';
    return this.http.post(url, panierDTO, options); // Utiliser les options (qui contiennent les en-têtes)
  }
  getCartTotal(userId: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7163/api/Panier/${userId}`);
  }
}
