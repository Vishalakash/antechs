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
      {
        path: 'lifestyle',
        loadChildren: () => import('./lifestyle/lifestyle.module').then(m => m.ECommLifeStyleModule),
      },
      {
        path: 'shoes',
        loadChildren: () => import('./shoes/shoes.module').then(m => m.ECommShoesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ECommEntityModule {}
