import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchase, Purchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';
import { PurchaseComponent } from './purchase.component';
import { PurchaseDetailComponent } from './purchase-detail.component';
import { PurchaseUpdateComponent } from './purchase-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseResolve implements Resolve<IPurchase> {
  constructor(private service: PurchaseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchase> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchase: HttpResponse<Purchase>) => {
          if (purchase.body) {
            return of(purchase.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Purchase());
  }
}

export const purchaseRoute: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseDetailComponent,
    resolve: {
      purchase: PurchaseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseUpdateComponent,
    resolve: {
      purchase: PurchaseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseUpdateComponent,
    resolve: {
      purchase: PurchaseResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
];
