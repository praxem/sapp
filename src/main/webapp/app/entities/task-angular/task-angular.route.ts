import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaskAngular, TaskAngular } from 'app/shared/model/task-angular.model';
import { TaskAngularService } from './task-angular.service';
import { TaskAngularComponent } from './task-angular.component';
import { TaskAngularDetailComponent } from './task-angular-detail.component';
import { TaskAngularUpdateComponent } from './task-angular-update.component';

@Injectable({ providedIn: 'root' })
export class TaskAngularResolve implements Resolve<ITaskAngular> {
  constructor(private service: TaskAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((task: HttpResponse<TaskAngular>) => {
          if (task.body) {
            return of(task.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskAngular());
  }
}

export const taskRoute: Routes = [
  {
    path: '',
    component: TaskAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TaskAngularDetailComponent,
    resolve: {
      task: TaskAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TaskAngularUpdateComponent,
    resolve: {
      task: TaskAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TaskAngularUpdateComponent,
    resolve: {
      task: TaskAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
