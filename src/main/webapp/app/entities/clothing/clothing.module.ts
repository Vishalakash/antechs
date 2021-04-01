import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ECommSharedModule } from 'app/shared/shared.module';
import { ClothingComponent } from './clothing.component';
import { ClothingDetailComponent } from './clothing-detail.component';
import { ClothingUpdateComponent } from './clothing-update.component';
import { ClothingDeleteDialogComponent } from './clothing-delete-dialog.component';
import { clothingRoute } from './clothing.route';

@NgModule({
  imports: [ECommSharedModule, RouterModule.forChild(clothingRoute)],
  declarations: [ClothingComponent, ClothingDetailComponent, ClothingUpdateComponent, ClothingDeleteDialogComponent],
  entryComponents: [ClothingDeleteDialogComponent],
})
export class ECommClothingModule {}
