import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountryAngular, CountryAngular } from 'app/shared/model/country-angular.model';
import { CountryAngularService } from './country-angular.service';
import { CountryAngularComponent } from './country-angular.component';
import { CountryAngularDetailComponent } from './country-angular-detail.component';
import { CountryAngularUpdateComponent } from './country-angular-update.component';

@Injectable({ providedIn: 'root' })
export class CountryAngularResolve implements Resolve<ICountryAngular> {
  constructor(private service: CountryAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountryAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((country: HttpResponse<CountryAngular>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CountryAngular());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CountryAngularDetailComponent,
    resolve: {
      country: CountryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CountryAngularUpdateComponent,
    resolve: {
      country: CountryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CountryAngularUpdateComponent,
    resolve: {
      country: CountryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
