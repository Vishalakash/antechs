import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IClothing, Clothing } from 'app/shared/model/clothing.model';
import { ClothingService } from './clothing.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-clothing-update',
  templateUrl: './clothing-update.component.html',
})
export class ClothingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    img: [],
    imgContentType: [],
    barnd: [],
    type: [],
    price: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected clothingService: ClothingService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clothing }) => {
      this.updateForm(clothing);
    });
  }

  updateForm(clothing: IClothing): void {
    this.editForm.patchValue({
      id: clothing.id,
      img: clothing.img,
      imgContentType: clothing.imgContentType,
      barnd: clothing.barnd,
      type: clothing.type,
      price: clothing.price,
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
    const clothing = this.createFromForm();
    if (clothing.id !== undefined) {
      this.subscribeToSaveResponse(this.clothingService.update(clothing));
    } else {
      this.subscribeToSaveResponse(this.clothingService.create(clothing));
    }
  }

  private createFromForm(): IClothing {
    return {
      ...new Clothing(),
      id: this.editForm.get(['id'])!.value,
      imgContentType: this.editForm.get(['imgContentType'])!.value,
      img: this.editForm.get(['img'])!.value,
      barnd: this.editForm.get(['barnd'])!.value,
      type: this.editForm.get(['type'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClothing>>): void {
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
