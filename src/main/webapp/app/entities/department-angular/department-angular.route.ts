import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentAngular, DepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from './department-angular.service';
import { DepartmentAngularComponent } from './department-angular.component';
import { DepartmentAngularDetailComponent } from './department-angular-detail.component';
import { DepartmentAngularUpdateComponent } from './department-angular-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentAngularResolve implements Resolve<IDepartmentAngular> {
  constructor(private service: DepartmentAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((department: HttpResponse<DepartmentAngular>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentAngular());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartmentAngularDetailComponent,
    resolve: {
      department: DepartmentAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartmentAngularUpdateComponent,
    resolve: {
      department: DepartmentAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartmentAngularUpdateComponent,
    resolve: {
      department: DepartmentAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
