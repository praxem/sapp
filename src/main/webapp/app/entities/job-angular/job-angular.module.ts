import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { JobAngularComponent } from './job-angular.component';
import { JobAngularDetailComponent } from './job-angular-detail.component';
import { JobAngularUpdateComponent } from './job-angular-update.component';
import { JobAngularDeleteDialogComponent } from './job-angular-delete-dialog.component';
import { jobRoute } from './job-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(jobRoute)],
  declarations: [JobAngularComponent, JobAngularDetailComponent, JobAngularUpdateComponent, JobAngularDeleteDialogComponent],
  entryComponents: [JobAngularDeleteDialogComponent]
})
export class SappJobAngularModule {}
