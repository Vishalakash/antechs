import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoes, Shoes } from 'app/shared/model/shoes.model';
import { ShoesService } from './shoes.service';
import { ShoesComponent } from './shoes.component';
import { ShoesDetailComponent } from './shoes-detail.component';
import { ShoesUpdateComponent } from './shoes-update.component';


@Injectable({ providedIn: 'root' })
export class ShoesResolve implements Resolve<IShoes> {
  constructor(private service: ShoesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoes: HttpResponse<Shoes>) => {
          if (shoes.body) {
            return of(shoes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Shoes());
  }
}

export const shoesRoute: Routes = [
  {
    path: '',
    component: ShoesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Shoes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShoesDetailComponent,
    resolve: {
      shoes: ShoesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Shoes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShoesUpdateComponent,
    resolve: {
      shoes: ShoesResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Shoes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShoesUpdateComponent,
    resolve: {
      shoes: ShoesResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Shoes',
    },
    canActivate: [UserRouteAccessService],
  },
];
