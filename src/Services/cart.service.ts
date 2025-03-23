import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
   addToCart(x:any):Observable<void>
    {
      return this.http.post<void> ('https://localhost:7163/api/Panier/AddOrUpdateArticleInPanier',x);
    }
}
