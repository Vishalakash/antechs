import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IElectronics, Electronics } from 'app/shared/model/electronics.model';
import { ElectronicsService } from './electronics.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-electronics-update',
  templateUrl: './electronics-update.component.html',
})
export class ElectronicsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    img: [],
    imgContentType: [],
    modelname: [],
    type: [],
    price: [],
  });
  panelTitle: string | undefined;
  buttonName: string | undefined;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected electronicsService: ElectronicsService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ electronics }) => {
      this.updateForm(electronics);
    });
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.panelTitle = 'Update Details';
        this.buttonName = 'Update';
      } else {
        this.panelTitle = 'Add a product';
        this.buttonName = 'Add';
      }
    });
  }

  updateForm(electronics: IElectronics): void {
    this.editForm.patchValue({
      id: electronics.id,
      img: electronics.img,
      imgContentType: electronics.imgContentType,
      modelname: electronics.modelname,
      type: electronics.type,
      price: electronics.price,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('eCommApp.error', { message: err.message })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const electronics = this.createFromForm();
    if (electronics.id !== undefined) {
      this.subscribeToSaveResponse(this.electronicsService.update(electronics));
    } else {
      this.subscribeToSaveResponse(this.electronicsService.create(electronics));
    }
  }

  private createFromForm(): IElectronics {
    return {
      ...new Electronics(),
      id: this.editForm.get(['id'])!.value,
      imgContentType: this.editForm.get(['imgContentType'])!.value,
      img: this.editForm.get(['img'])!.value,
      modelname: this.editForm.get(['modelname'])!.value,
      type: this.editForm.get(['type'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IElectronics>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
