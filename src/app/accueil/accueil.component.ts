import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Categorie = {
  titre: string;
  images: string[];
};

@Component({
  selector: 'app-accueil',
  imports: [FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  urlImageSaisie = '';
  nomCategorieSaisie = '';
  categories: Categorie[] = [];
  categorieSelectionne = 0;

  ngOnInit() {
    const enregistrement = localStorage.getItem('categories');

    const categoriesParDefaut: Categorie[] = [
      {
        titre: 'A',
        images: [],
      },
      {
        titre: 'B',
        images: [],
      },
      {
        titre: 'C',
        images: [],
      },
      {
        titre: 'D',
        images: [],
      },
      {
        titre: 'E',
        images: [],
      },
    ];

    if (enregistrement == null) {
      localStorage.setItem('categories', JSON.stringify(categoriesParDefaut));
    }

    this.categories = JSON.parse(localStorage.getItem('categories')!);
  }



  onClicAjouterImage() {
    this.categories[this.categorieSelectionne].images.push(this.urlImageSaisie);
    this.urlImageSaisie = '';

    this.sauvegarde();
  }

  onClicAjouterCategorie() {
    this.categories.push(
      {
        titre : this.nomCategorieSaisie,
        images : []
      })
    this.nomCategorieSaisie = '';

    this.sauvegarde();
  }

  supprimerCategorie(indexCategorie : number) {
    this.categories.splice(indexCategorie,1)

    this.sauvegarde();
  }


  deplacerImage(indexCategorie: number, indexImage : number, descendre : boolean = true) {

    //recupere l'url de l'image cliquée dans this.categories
    // (à l'index "indexCategorie" dans son tableau "image" à l'index "indexImage")
    const urlImage = this.categories[indexCategorie].images[indexImage];

    //ajouter l'url dans le tableau "images" de la categorie à "indexCategorie" + 1
    this.categories[indexCategorie + (descendre ? 1 : -1)].images.push(urlImage)

    // supprimer l'image à l'index "indexImage" du tableau "images"
    // de l'ancienne categorie (à "indexCategorie")
    this.categories[indexCategorie].images.splice(indexImage,1)

    //on sauvegarde les categories
    this.sauvegarde();
  }

  supprimerImage(indexCategorie: number, indexImage : number) {

    // supprimer l'image à l'index "indexImage" du tableau "images"
    // de l'ancienne categorie (à "indexCategorie")
    this.categories[indexCategorie].images.splice(indexImage,1)

    //on sauvegarde les categories
    this.sauvegarde();
  }

  sauvegarde() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

}
