import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ECommSharedModule } from 'app/shared/shared.module';
import { ElectronicsComponent } from './electronics.component';
import { ElectronicsDetailComponent } from './electronics-detail.component';
import { ElectronicsUpdateComponent } from './electronics-update.component';
import { ElectronicsDeleteDialogComponent } from './electronics-delete-dialog.component';
import { electronicsRoute } from './electronics.route';

@NgModule({
  imports: [ECommSharedModule, RouterModule.forChild(electronicsRoute)],
  declarations: [ElectronicsComponent, ElectronicsDetailComponent, ElectronicsUpdateComponent, ElectronicsDeleteDialogComponent],
  entryComponents: [ElectronicsDeleteDialogComponent],
})
export class ECommElectronicsModule {}
