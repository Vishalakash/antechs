import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IElectronics, Electronics } from 'app/shared/model/electronics.model';
import { ElectronicsService } from './electronics.service';
import { ElectronicsComponent } from './electronics.component';
import { ElectronicsDetailComponent } from './electronics-detail.component';
import { ElectronicsUpdateComponent } from './electronics-update.component';


@Injectable({ providedIn: 'root' })
export class ElectronicsResolve implements Resolve<IElectronics> {
  constructor(private service: ElectronicsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IElectronics> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((electronics: HttpResponse<Electronics>) => {
          if (electronics.body) {
            return of(electronics.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Electronics());
  }
}

export const electronicsRoute: Routes = [
  {
    path: '',
    component: ElectronicsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Electronics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ElectronicsDetailComponent,
    resolve: {
      electronics: ElectronicsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Electronics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ElectronicsUpdateComponent,
    resolve: {
      electronics: ElectronicsResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Electronics',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ElectronicsUpdateComponent,
    resolve: {
      electronics: ElectronicsResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Electronics',
    },
    canActivate: [UserRouteAccessService],
  },
];
