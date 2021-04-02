import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILifeStyle } from 'app/shared/model/lifestyle.model';
import { LifeStyleService } from './lifestyle.service';
import { LifeStyleDeleteDialogComponent } from './lifestyle-delete-dialog.component';

@Component({
  selector: 'jhi-lifestyle',
  templateUrl: './lifestyle.component.html',
})
export class LifeStyleComponent implements OnInit, OnDestroy {
  lifestyle?: ILifeStyle[];
  eventSubscriber?: Subscription;

  constructor(
    protected lifestyleService: LifeStyleService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.lifestyleService.query().subscribe((res: HttpResponse<ILifeStyle[]>) => (this.lifestyle = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLifeStyle();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILifeStyle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLifeStyle(): void {
    this.eventSubscriber = this.eventManager.subscribe('lifestyleListModification', () => this.loadAll());
  }

  delete(lifestyle: ILifeStyle): void {
    const modalRef = this.modalService.open(LifeStyleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lifestyle = lifestyle;
  }
}
