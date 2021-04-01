import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'electronics',
        loadChildren: () => import('./electronics/electronics.module').then(m => m.ECommElectronicsModule),
      },
      {
        path: 'clothing',
        loadChildren: () => import('./clothing/clothing.module').then(m => m.ECommClothingModule),
      },
      {
        path: 'purchase',
        loadChildren: () => import('./purchase/purchase.module').then(m => m.ECommPurchaseModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ECommEntityModule {}
