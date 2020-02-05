import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { DepartmentAngularComponent } from './department-angular.component';
import { DepartmentAngularDetailComponent } from './department-angular-detail.component';
import { DepartmentAngularUpdateComponent } from './department-angular-update.component';
import { DepartmentAngularDeleteDialogComponent } from './department-angular-delete-dialog.component';
import { departmentRoute } from './department-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(departmentRoute)],
  declarations: [
    DepartmentAngularComponent,
    DepartmentAngularDetailComponent,
    DepartmentAngularUpdateComponent,
    DepartmentAngularDeleteDialogComponent
  ],
  entryComponents: [DepartmentAngularDeleteDialogComponent]
})
export class SappDepartmentAngularModule {}
