import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { Page404Component } from './page404/page404.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
