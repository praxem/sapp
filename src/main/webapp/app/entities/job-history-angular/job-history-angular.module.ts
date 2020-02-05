import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { JobHistoryAngularComponent } from './job-history-angular.component';
import { JobHistoryAngularDetailComponent } from './job-history-angular-detail.component';
import { JobHistoryAngularUpdateComponent } from './job-history-angular-update.component';
import { JobHistoryAngularDeleteDialogComponent } from './job-history-angular-delete-dialog.component';
import { jobHistoryRoute } from './job-history-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(jobHistoryRoute)],
  declarations: [
    JobHistoryAngularComponent,
    JobHistoryAngularDetailComponent,
    JobHistoryAngularUpdateComponent,
    JobHistoryAngularDeleteDialogComponent
  ],
  entryComponents: [JobHistoryAngularDeleteDialogComponent]
})
export class SappJobHistoryAngularModule {}
