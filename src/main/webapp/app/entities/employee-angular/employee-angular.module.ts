import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { EmployeeAngularComponent } from './employee-angular.component';
import { EmployeeAngularDetailComponent } from './employee-angular-detail.component';
import { EmployeeAngularUpdateComponent } from './employee-angular-update.component';
import { EmployeeAngularDeleteDialogComponent } from './employee-angular-delete-dialog.component';
import { employeeRoute } from './employee-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(employeeRoute)],
  declarations: [
    EmployeeAngularComponent,
    EmployeeAngularDetailComponent,
    EmployeeAngularUpdateComponent,
    EmployeeAngularDeleteDialogComponent
  ],
  entryComponents: [EmployeeAngularDeleteDialogComponent]
})
export class SappEmployeeAngularModule {}
