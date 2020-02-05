import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegionAngular, RegionAngular } from 'app/shared/model/region-angular.model';
import { RegionAngularService } from './region-angular.service';
import { RegionAngularComponent } from './region-angular.component';
import { RegionAngularDetailComponent } from './region-angular-detail.component';
import { RegionAngularUpdateComponent } from './region-angular-update.component';

@Injectable({ providedIn: 'root' })
export class RegionAngularResolve implements Resolve<IRegionAngular> {
  constructor(private service: RegionAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((region: HttpResponse<RegionAngular>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionAngular());
  }
}

export const regionRoute: Routes = [
  {
    path: '',
    component: RegionAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RegionAngularDetailComponent,
    resolve: {
      region: RegionAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RegionAngularUpdateComponent,
    resolve: {
      region: RegionAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RegionAngularUpdateComponent,
    resolve: {
      region: RegionAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
