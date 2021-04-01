import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IElectronics } from 'app/shared/model/electronics.model';
import { ElectronicsService } from './electronics.service';

@Component({
  templateUrl: './electronics-delete-dialog.component.html',
})
export class ElectronicsDeleteDialogComponent {
  electronics?: IElectronics;

  constructor(
    protected electronicsService: ElectronicsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.electronicsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('electronicsListModification');
      this.activeModal.close();
    });
  }
}
