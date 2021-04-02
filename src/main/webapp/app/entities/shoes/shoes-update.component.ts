import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IShoes, Shoes } from 'app/shared/model/shoes.model';
import { ShoesService } from './shoes.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-shoes-update',
  templateUrl: './shoes-update.component.html',
})
export class ShoesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    img: [],
    imgContentType: [],
    type: [],
    price: [],
  });
  panelTitle: string | undefined;
  buttonName: string | undefined;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected shoesService: ShoesService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoes }) => {
      this.updateForm(shoes);
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

  updateForm(shoes: IShoes): void {
    this.editForm.patchValue({
      id: shoes.id,
      img: shoes.img,
      imgContentType: shoes.imgContentType,
      type: shoes.type,
      price: shoes.price,
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
    const shoes = this.createFromForm();
    if (shoes.id !== undefined) {
      this.subscribeToSaveResponse(this.shoesService.update(shoes));
    } else {
      this.subscribeToSaveResponse(this.shoesService.create(shoes));
    }
  }

  private createFromForm(): IShoes {
    return {
      ...new Shoes(),
      id: this.editForm.get(['id'])!.value,
      imgContentType: this.editForm.get(['imgContentType'])!.value,
      img: this.editForm.get(['img'])!.value,
      type: this.editForm.get(['type'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoes>>): void {
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
