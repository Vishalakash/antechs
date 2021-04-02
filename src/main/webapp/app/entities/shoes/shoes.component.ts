import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShoes } from 'app/shared/model/shoes.model';
import { ShoesService } from './shoes.service';
import { ShoesDeleteDialogComponent } from './shoes-delete-dialog.component';

@Component({
  selector: 'jhi-shoes',
  templateUrl: './shoes.component.html',
})
export class ShoesComponent implements OnInit, OnDestroy {
  shoes?: IShoes[];
  eventSubscriber?: Subscription;

  constructor(
    protected shoesService: ShoesService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shoesService.query().subscribe((res: HttpResponse<IShoes[]>) => (this.shoes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShoes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInShoes(): void {
    this.eventSubscriber = this.eventManager.subscribe('shoesListModification', () => this.loadAll());
  }

  delete(shoes: IShoes): void {
    const modalRef = this.modalService.open(ShoesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shoes = shoes;
  }
}
