import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoes } from 'app/shared/model/shoes.model';
import { ShoesService } from './shoes.service';

@Component({
  templateUrl: './shoes-delete-dialog.component.html',
})
export class ShoesDeleteDialogComponent {
  shoes?: IShoes;

  constructor(
    protected shoesService: ShoesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoesListModification');
      this.activeModal.close();
    });
  }
}
