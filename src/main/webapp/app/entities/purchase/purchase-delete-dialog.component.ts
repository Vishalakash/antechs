import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';

@Component({
  templateUrl: './purchase-delete-dialog.component.html',
})
export class PurchaseDeleteDialogComponent {
  purchase?: IPurchase;

  constructor(protected purchaseService: PurchaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseListModification');
      this.activeModal.close();
    });
  }
}
