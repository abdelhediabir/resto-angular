// src/app/Services/article.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Modeles/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les articles
  GetAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('https://localhost:7163/api/Article');  // Retourne un Observable avec des articles
  }
  addArticle(x:any):Observable<void>
  {
    return this.http.post<void> ('https://localhost:7163/api/Article',x);
  }
  deleteArticleById(idart:BigInt):Observable<void>
  {
    return this.http.delete<void> (`https://localhost:7163/api/Article/${idart}`)
  }
  getArticleById(idCournat:BigInt):Observable<Article>
  {
    return this.http.get<Article> (`https://localhost:7163/api/Article/${idCournat}`)
  }

  updateArticle(idart:BigInt,article:any):Observable<void>
  {
    return this.http.put<void> (`https://localhost:7163/api/Article/${idart}`,article)
  }
  getArticleDetails(idart: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7163/api/Article/${idart}`);
  }
}
