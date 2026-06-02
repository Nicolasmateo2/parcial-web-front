import { Routes } from '@angular/router';
import { FormsTorneoComponent } from './features/forms/forms-torneo.component';

export const routes: Routes = [
  {
    path: 'torneo',
    component: FormsTorneoComponent
  },
  {
    path: '',
    redirectTo: '/torneo',
    pathMatch: 'full'
  }
];