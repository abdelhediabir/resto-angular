// src/app/article/article.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/Services/article.service';
import { Article } from 'src/Modeles/Article';  // Assurez-vous d'importer le modèle Article
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  {
  articles: Article[] = [];  // Variable pour stocker les articles récupérés

  constructor(private AS: ArticleService,private dialog:MatDialog ) {
    this.fetchData();

  }  // Utiliser un nom plus explicite pour le service

  /*ngOnInit(): void {
    // Appeler le service pour récupérer les articles
    this.AS.GetAllArticles().subscribe((articles) => {
      this.articles = articles;  // Assigner la réponse aux articles
    });
  }*/
    fetchData()
    {
      this.AS.GetAllArticles().subscribe((data)=>{
        console.log("Données reçues :", data);
        this.articles =data;
  
      })
    }
    open():void{
      //lancer 
      let dialogRef = this.dialog.open(ArticleFormComponent, {
        height: '800px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe(data=>//5the les données mel formuliare (event-modale)
        {
          console.log("Dialog output :",data)
          if(data){
            this.AS.addArticle(data).subscribe(()=>{
              this.fetchData();
            })
          }
        }
      
    )
     
    }
    openEdit(id:BigInt)
    {
      //1 lancer la boite
      const DialogConfig= new MatDialogConfig();
      DialogConfig.width = '800px';  // Définir la largeur
  DialogConfig.height = '600px'; // Définir la hauteur
      
     this.AS.getArticleById(id).subscribe((evtRecup)=>{
        DialogConfig.data=evtRecup
        //envoie les données vers le modal-event acev le varible DialogConfig
        let dialogRef=this.dialog.open(ArticleFormComponent,DialogConfig);
        dialogRef.afterClosed().subscribe(data=>//5the les données mel formuliare (event-modale)
        {
          console.log("Dialog output :",data)
          if(data){
            console.log("Updating article with ID:", id, "Data:", data);
            this.AS.updateArticle(id,data).subscribe(()=>{
              console.log("Mise à jour réussie !");
              this.fetchData();
            },
            (error) => {
              console.log("Erreur lors de la mise à jour :", error);
              if (error.status === 400) {
                console.log("Détails de l'erreur 400 :", error.error);
              }
            }
          )
          }
        }  
      ) 
    });
      }
  delete(id:BigInt)
  {
    //1 lancer la boite(confirmdialog)
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px',
    });
    //2attendre le click de user 
    dialogRef.afterClosed().subscribe(result => {
      //3 si click=confirm => effacer
       if (result)// fel html mte dialog ken ynx=zel 3la demte ttb3the true eli hua result==true
       {
        this.AS.deleteArticleById(id).subscribe(()=>{
          this.AS.GetAllArticles().subscribe((a)=>{
            this.articles=a;
          })
    
        })
       }
    });
    
    
    
  }
}
