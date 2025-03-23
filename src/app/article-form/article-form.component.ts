import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent //implements OnInit {
  {form!: FormGroup;
  idCournat!: BigInt;

  constructor(
    private AS: ArticleService,
    private router: Router,
    public dialogRef:MatDialogRef<ArticleFormComponent>,
    private activatedRoute: ActivatedRoute,
    @Inject (MAT_DIALOG_DATA) data:any
  ) {
    if(data)
      {
        this.form=new FormGroup({
          titleart: new FormControl(data.titleart),
          descriptionart:new FormControl(data.descriptionart),
          prix: new FormControl(data.prix),
          imageUrl:new FormControl(data.imageUrl),
          IdCat:new FormControl(data.IdCat),
          quantiteStock:new FormControl(data.quantiteStock)

        })
      }
      else
      {
        this.form = new FormGroup({
          titleart: new FormControl(null, [Validators.required]),
          descriptionart: new FormControl(null, [Validators.required]),
          prix: new FormControl(null, [Validators.required]),
          imageUrl: new FormControl(null, [Validators.required]),
          IdCat: new FormControl(null),
          quantiteStock: new FormControl(null, [Validators.required]),
        });
      }
  }

  /*ngOnInit() {
    // 1. Chercher l'ID dans la route active
    this.idCournat = this.activatedRoute.snapshot.params['id'];
    console.log(this.idCournat);

    // Initialisation du formulaire
    this.form = new FormGroup({
      titleart: new FormControl(null, [Validators.required]),
      descriptionart: new FormControl(null, [Validators.required]),
      prix: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      IdCat: new FormControl(null),
      quantiteStock: new FormControl(null, [Validators.required]),
    });

    // 2. Si id existe, je suis dans le mode édition
    if(this.idCournat)
      {   
          //je suis dans edit 
         /// donc 
         this.AS.updateArticle(this.idCournat,this.form.value).subscribe(a=>{
        this.router.navigate([''])
  
         })
      }
  }*/

 /* ajouter() {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.idCournat) {
        // Si nous sommes dans le mode édition, appel à updateArticle
        this.AS.updateArticle(this.idCournat, this.form.value).subscribe(() => {
          this.router.navigate(['']);
        });
      } else {
        // Sinon, création d'un nouvel article
        this.AS.addArticle(this.form.value).subscribe(() => {
          this.router.navigate(['']);
        });
      }
    }
  }*/
 save(){
  console.log(this.form.value)
  this.dialogRef.close(this.form.value);
 }
 close() {
  this.dialogRef.close();
}
}
