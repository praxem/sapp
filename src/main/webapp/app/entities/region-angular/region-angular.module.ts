import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { RegionAngularComponent } from './region-angular.component';
import { RegionAngularDetailComponent } from './region-angular-detail.component';
import { RegionAngularUpdateComponent } from './region-angular-update.component';
import { RegionAngularDeleteDialogComponent } from './region-angular-delete-dialog.component';
import { regionRoute } from './region-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(regionRoute)],
  declarations: [RegionAngularComponent, RegionAngularDetailComponent, RegionAngularUpdateComponent, RegionAngularDeleteDialogComponent],
  entryComponents: [RegionAngularDeleteDialogComponent]
})
export class SappRegionAngularModule {}
