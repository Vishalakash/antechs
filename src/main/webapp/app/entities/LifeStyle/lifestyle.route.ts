import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILifeStyle, LifeStyle } from 'app/shared/model/lifestyle.model';
import { LifeStyleService } from './lifestyle.service';
import { LifeStyleComponent } from './lifestyle.component';
import { LifeStyleDetailComponent } from './lifestyle-detail.component';
import { LifeStyleUpdateComponent } from './lifestyle-update.component';


@Injectable({ providedIn: 'root' })
export class LifeStyleResolve implements Resolve<ILifeStyle> {
  constructor(private service: LifeStyleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILifeStyle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((lifestyle: HttpResponse<LifeStyle>) => {
          if (lifestyle.body) {
            return of(lifestyle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LifeStyle());
  }
}

export const lifestyleRoute: Routes = [
  {
    path: '',
    component: LifeStyleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LifeStyle',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LifeStyleDetailComponent,
    resolve: {
      lifestyle: LifeStyleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LifeStyle',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LifeStyleUpdateComponent,
    resolve: {
      lifestyle: LifeStyleResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LifeStyle',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LifeStyleUpdateComponent,
    resolve: {
      lifestyle: LifeStyleResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LifeStyle',
    },
    canActivate: [UserRouteAccessService],
  },
];
