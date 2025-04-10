import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  constructor(private http: HttpClient) { }
  passerCommande(headers: HttpHeaders): Observable<any> {
  
      return this.http.post<any>('https://localhost:7163/api/Commande/commander',{}, { headers }); 
    }

    commandesClient(headers: HttpHeaders): Observable<any> {
      return this.http.get<any>(' https://localhost:7163/api/Commande/mes-commandes', { headers });
    }
    getAllCommandes(headers: HttpHeaders): Observable<any> {
      return this.http.get<any>(`https://localhost:7163/api/Commande`, { headers });
    }
   
}
