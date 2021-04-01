import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClothing, Clothing } from 'app/shared/model/clothing.model';
import { ClothingService } from './clothing.service';
import { ClothingComponent } from './clothing.component';
import { ClothingDetailComponent } from './clothing-detail.component';
import { ClothingUpdateComponent } from './clothing-update.component';

@Injectable({ providedIn: 'root' })
export class ClothingResolve implements Resolve<IClothing> {
  constructor(private service: ClothingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClothing> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clothing: HttpResponse<Clothing>) => {
          if (clothing.body) {
            return of(clothing.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Clothing());
  }
}

export const clothingRoute: Routes = [
  {
    path: '',
    component: ClothingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Clothing',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClothingDetailComponent,
    resolve: {
      clothing: ClothingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Clothing',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClothingUpdateComponent,
    resolve: {
      clothing: ClothingResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Clothing',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClothingUpdateComponent,
    resolve: {
      clothing: ClothingResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Clothing',
    },
    canActivate: [UserRouteAccessService],
  },
];
