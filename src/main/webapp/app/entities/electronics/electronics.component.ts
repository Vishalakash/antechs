import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IElectronics } from 'app/shared/model/electronics.model';
import { ElectronicsService } from './electronics.service';
import { ElectronicsDeleteDialogComponent } from './electronics-delete-dialog.component';

@Component({
  selector: 'jhi-electronics',
  templateUrl: './electronics.component.html',
})
export class ElectronicsComponent implements OnInit, OnDestroy {
  electronics?: IElectronics[];
  eventSubscriber?: Subscription;

  constructor(
    protected electronicsService: ElectronicsService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.electronicsService.query().subscribe((res: HttpResponse<IElectronics[]>) => (this.electronics = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInElectronics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IElectronics): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInElectronics(): void {
    this.eventSubscriber = this.eventManager.subscribe('electronicsListModification', () => this.loadAll());
  }

  delete(electronics: IElectronics): void {
    const modalRef = this.modalService.open(ElectronicsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.electronics = electronics;
  }
}
