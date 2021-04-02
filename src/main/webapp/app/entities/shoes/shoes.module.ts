import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ECommSharedModule } from 'app/shared/shared.module';
import { ShoesComponent } from './shoes.component';
import { ShoesDetailComponent } from './shoes-detail.component';
import { ShoesUpdateComponent } from './shoes-update.component';
import { ShoesDeleteDialogComponent } from './shoes-delete-dialog.component';
import { shoesRoute } from './shoes.route';

@NgModule({
  imports: [ECommSharedModule, RouterModule.forChild(shoesRoute)],
  declarations: [ShoesComponent, ShoesDetailComponent, ShoesUpdateComponent, ShoesDeleteDialogComponent],
  entryComponents: [ShoesDeleteDialogComponent],
})
export class ECommShoesModule {}
