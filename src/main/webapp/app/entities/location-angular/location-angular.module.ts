import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { LocationAngularComponent } from './location-angular.component';
import { LocationAngularDetailComponent } from './location-angular-detail.component';
import { LocationAngularUpdateComponent } from './location-angular-update.component';
import { LocationAngularDeleteDialogComponent } from './location-angular-delete-dialog.component';
import { locationRoute } from './location-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(locationRoute)],
  declarations: [
    LocationAngularComponent,
    LocationAngularDetailComponent,
    LocationAngularUpdateComponent,
    LocationAngularDeleteDialogComponent
  ],
  entryComponents: [LocationAngularDeleteDialogComponent]
})
export class SappLocationAngularModule {}
