import { ArticlePanier } from "./ArticlePanier";

export interface Cart {
    idPanier: number;
    userId: string;
    dateCreation: string;
    prixTotal: number;
    lignesPanier: any[]; // 'lignesPanier' est un tableau d'objets ArticlePanier
  }
  