import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPurchase, Purchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'jhi-purchase-update',
  templateUrl: './purchase-update.component.html',
})
export class PurchaseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    address: [],
    age: [],
  });

  constructor(protected purchaseService: PurchaseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchase }) => {
      this.updateForm(purchase);
    });
  }

  updateForm(purchase: IPurchase): void {
    this.editForm.patchValue({
      id: purchase.id,
      name: purchase.name,
      address: purchase.address,
      age: purchase.age,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchase = this.createFromForm();
    if (purchase.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseService.update(purchase));
    } else {
      this.subscribeToSaveResponse(this.purchaseService.create(purchase));
    }
  }

  private createFromForm(): IPurchase {
    return {
      ...new Purchase(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      age: this.editForm.get(['age'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchase>>): void {
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
