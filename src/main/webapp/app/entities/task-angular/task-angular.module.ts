import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { TaskAngularComponent } from './task-angular.component';
import { TaskAngularDetailComponent } from './task-angular-detail.component';
import { TaskAngularUpdateComponent } from './task-angular-update.component';
import { TaskAngularDeleteDialogComponent } from './task-angular-delete-dialog.component';
import { taskRoute } from './task-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(taskRoute)],
  declarations: [TaskAngularComponent, TaskAngularDetailComponent, TaskAngularUpdateComponent, TaskAngularDeleteDialogComponent],
  entryComponents: [TaskAngularDeleteDialogComponent]
})
export class SappTaskAngularModule {}
