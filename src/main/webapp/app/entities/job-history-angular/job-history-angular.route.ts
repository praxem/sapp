import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobHistoryAngular, JobHistoryAngular } from 'app/shared/model/job-history-angular.model';
import { JobHistoryAngularService } from './job-history-angular.service';
import { JobHistoryAngularComponent } from './job-history-angular.component';
import { JobHistoryAngularDetailComponent } from './job-history-angular-detail.component';
import { JobHistoryAngularUpdateComponent } from './job-history-angular-update.component';

@Injectable({ providedIn: 'root' })
export class JobHistoryAngularResolve implements Resolve<IJobHistoryAngular> {
  constructor(private service: JobHistoryAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobHistoryAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((jobHistory: HttpResponse<JobHistoryAngular>) => {
          if (jobHistory.body) {
            return of(jobHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobHistoryAngular());
  }
}

export const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryAngularComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobHistoryAngularDetailComponent,
    resolve: {
      jobHistory: JobHistoryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobHistoryAngularUpdateComponent,
    resolve: {
      jobHistory: JobHistoryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobHistoryAngularUpdateComponent,
    resolve: {
      jobHistory: JobHistoryAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
