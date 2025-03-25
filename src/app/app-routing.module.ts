import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { CartService } from 'src/Services/cart.service';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent

  },
  {
    path:'Articles',
    pathMatch:'full',
    component:ArticleComponent
  },
  {
    path:'ajouterArticle',
    pathMatch:'full',
    component:ArticleFormComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:ArticleFormComponent
  },
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  }
 ,{
  path:'shop',
  pathMatch:'full',
  component:ShopComponent
 },
 {
  path:'cart',
  pathMatch:'full',
  component:CartComponent
 }


];

  

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
  ,
})
export class AppRoutingModule { }
