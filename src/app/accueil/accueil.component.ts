import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

type Categorie = {
  id: number
  titre: string
  images: Image[]
}

type Image = {
  id: number
  url: string
}

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

  http = inject(HttpClient)

  ngOnInit() {
    this.refresh()
  }


  refresh() {
    this.http
      .get<Categorie[]>("http://localhost:5000/categories")
      .subscribe(categories  => this.categories = categories)
  }

  onClicAjouterImage() {
    this.http
      .post(
        "http://localhost:5000/image",
        {
          url: this.urlImageSaisie,
          categorie_id: this.categorieSelectionne
        })
      .subscribe(resultat => this.refresh())
  }

  onClicAjouterCategorie() {
    // this.categories.push(
    //   {
    //     titre : this.nomCategorieSaisie,
    //     images : []
    //   })
    // this.nomCategorieSaisie = '';
    //
    // this.sauvegarde();
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

  supprimerImage(idImage : number) {

    this.http.delete("http://localhost:5000/image/" + idImage)
      .subscribe(resultat => this.refresh())

  }

  //--- Exemple avec localstorage ------
  // supprimerImage(indexCategorie: number, indexImage : number) {
  //
  //   // supprimer l'image à l'index "indexImage" du tableau "images"
  //   // de l'ancienne categorie (à "indexCategorie")
  //   this.categories[indexCategorie].images.splice(indexImage,1)
  //
  //   //on sauvegarde les categories
  //   this.sauvegarde();
  // }

  sauvegarde() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

}
