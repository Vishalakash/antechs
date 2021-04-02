import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ECommSharedModule } from 'app/shared/shared.module';
import { LifeStyleComponent } from './lifestyle.component';
import { LifeStyleDetailComponent } from './lifestyle-detail.component';
import { LifeStyleUpdateComponent } from './lifestyle-update.component';
import { LifeStyleDeleteDialogComponent } from './lifestyle-delete-dialog.component';
import { lifestyleRoute } from './lifestyle.route';

@NgModule({
  imports: [ECommSharedModule, RouterModule.forChild(lifestyleRoute)],
  declarations: [LifeStyleComponent, LifeStyleDetailComponent, LifeStyleUpdateComponent, LifeStyleDeleteDialogComponent],
  entryComponents: [LifeStyleDeleteDialogComponent],
})
export class ECommLifeStyleModule {}
