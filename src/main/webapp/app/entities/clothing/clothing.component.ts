import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClothing } from 'app/shared/model/clothing.model';
import { ClothingService } from './clothing.service';
import { ClothingDeleteDialogComponent } from './clothing-delete-dialog.component';

@Component({
  selector: 'jhi-clothing',
  templateUrl: './clothing.component.html',
})
export class ClothingComponent implements OnInit, OnDestroy {
  clothing?: IClothing[];
  eventSubscriber?: Subscription;

  constructor(
    protected clothingService: ClothingService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.clothingService.query().subscribe((res: HttpResponse<IClothing[]>) => (this.clothing = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClothing();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClothing): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInClothing(): void {
    this.eventSubscriber = this.eventManager.subscribe('clothingListModification', () => this.loadAll());
  }

  delete(clothing: IClothing): void {
    const modalRef = this.modalService.open(ClothingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clothing = clothing;
  }
}
