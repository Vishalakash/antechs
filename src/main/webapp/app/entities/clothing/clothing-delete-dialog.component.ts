import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClothing } from 'app/shared/model/clothing.model';
import { ClothingService } from './clothing.service';

@Component({
  templateUrl: './clothing-delete-dialog.component.html',
})
export class ClothingDeleteDialogComponent {
  clothing?: IClothing;

  constructor(protected clothingService: ClothingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clothingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clothingListModification');
      this.activeModal.close();
    });
  }
}
