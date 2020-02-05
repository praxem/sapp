import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocationAngular, LocationAngular } from 'app/shared/model/location-angular.model';
import { LocationAngularService } from './location-angular.service';
import { LocationAngularComponent } from './location-angular.component';
import { LocationAngularDetailComponent } from './location-angular-detail.component';
import { LocationAngularUpdateComponent } from './location-angular-update.component';

@Injectable({ providedIn: 'root' })
export class LocationAngularResolve implements Resolve<ILocationAngular> {
  constructor(private service: LocationAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocationAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((location: HttpResponse<LocationAngular>) => {
          if (location.body) {
            return of(location.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocationAngular());
  }
}

export const locationRoute: Routes = [
  {
    path: '',
    component: LocationAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocationAngularDetailComponent,
    resolve: {
      location: LocationAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocationAngularUpdateComponent,
    resolve: {
      location: LocationAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocationAngularUpdateComponent,
    resolve: {
      location: LocationAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
