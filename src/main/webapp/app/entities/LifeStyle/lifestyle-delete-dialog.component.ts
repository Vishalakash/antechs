import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILifeStyle } from 'app/shared/model/lifestyle.model';
import { LifeStyleService } from './lifestyle.service';

@Component({
  templateUrl: './lifestyle-delete-dialog.component.html',
})
export class LifeStyleDeleteDialogComponent {
  lifestyle?: ILifeStyle;

  constructor(
    protected lifestyleService: LifeStyleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lifestyleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('lifestyleListModification');
      this.activeModal.close();
    });
  }
}
