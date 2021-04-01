import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';
import { PurchaseDeleteDialogComponent } from './purchase-delete-dialog.component';

@Component({
  selector: 'jhi-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent implements OnInit, OnDestroy {
  purchases?: IPurchase[];
  eventSubscriber?: Subscription;

  constructor(protected purchaseService: PurchaseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.purchaseService.query().subscribe((res: HttpResponse<IPurchase[]>) => (this.purchases = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchase): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchases(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseListModification', () => this.loadAll());
  }

  delete(purchase: IPurchase): void {
    const modalRef = this.modalService.open(PurchaseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchase = purchase;
  }
}
