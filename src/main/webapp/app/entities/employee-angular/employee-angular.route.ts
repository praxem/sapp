import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployeeAngular, EmployeeAngular } from 'app/shared/model/employee-angular.model';
import { EmployeeAngularService } from './employee-angular.service';
import { EmployeeAngularComponent } from './employee-angular.component';
import { EmployeeAngularDetailComponent } from './employee-angular-detail.component';
import { EmployeeAngularUpdateComponent } from './employee-angular-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeAngularResolve implements Resolve<IEmployeeAngular> {
  constructor(private service: EmployeeAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employee: HttpResponse<EmployeeAngular>) => {
          if (employee.body) {
            return of(employee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeAngular());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeAngularDetailComponent,
    resolve: {
      employee: EmployeeAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeAngularUpdateComponent,
    resolve: {
      employee: EmployeeAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeAngularUpdateComponent,
    resolve: {
      employee: EmployeeAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
