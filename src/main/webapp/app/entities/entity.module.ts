import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-angular',
        loadChildren: () => import('./region-angular/region-angular.module').then(m => m.SappRegionAngularModule)
      },
      {
        path: 'country-angular',
        loadChildren: () => import('./country-angular/country-angular.module').then(m => m.SappCountryAngularModule)
      },
      {
        path: 'location-angular',
        loadChildren: () => import('./location-angular/location-angular.module').then(m => m.SappLocationAngularModule)
      },
      {
        path: 'department-angular',
        loadChildren: () => import('./department-angular/department-angular.module').then(m => m.SappDepartmentAngularModule)
      },
      {
        path: 'task-angular',
        loadChildren: () => import('./task-angular/task-angular.module').then(m => m.SappTaskAngularModule)
      },
      {
        path: 'employee-angular',
        loadChildren: () => import('./employee-angular/employee-angular.module').then(m => m.SappEmployeeAngularModule)
      },
      {
        path: 'job-angular',
        loadChildren: () => import('./job-angular/job-angular.module').then(m => m.SappJobAngularModule)
      },
      {
        path: 'job-history-angular',
        loadChildren: () => import('./job-history-angular/job-history-angular.module').then(m => m.SappJobHistoryAngularModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SappEntityModule {}
