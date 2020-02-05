import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobAngular, JobAngular } from 'app/shared/model/job-angular.model';
import { JobAngularService } from './job-angular.service';
import { JobAngularComponent } from './job-angular.component';
import { JobAngularDetailComponent } from './job-angular-detail.component';
import { JobAngularUpdateComponent } from './job-angular-update.component';

@Injectable({ providedIn: 'root' })
export class JobAngularResolve implements Resolve<IJobAngular> {
  constructor(private service: JobAngularService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobAngular> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((job: HttpResponse<JobAngular>) => {
          if (job.body) {
            return of(job.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobAngular());
  }
}

export const jobRoute: Routes = [
  {
    path: '',
    component: JobAngularComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'sappApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobAngularDetailComponent,
    resolve: {
      job: JobAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobAngularUpdateComponent,
    resolve: {
      job: JobAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobAngularUpdateComponent,
    resolve: {
      job: JobAngularResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sappApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
