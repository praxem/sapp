import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SappSharedModule } from 'app/shared/shared.module';
import { CountryAngularComponent } from './country-angular.component';
import { CountryAngularDetailComponent } from './country-angular-detail.component';
import { CountryAngularUpdateComponent } from './country-angular-update.component';
import { CountryAngularDeleteDialogComponent } from './country-angular-delete-dialog.component';
import { countryRoute } from './country-angular.route';

@NgModule({
  imports: [SappSharedModule, RouterModule.forChild(countryRoute)],
  declarations: [
    CountryAngularComponent,
    CountryAngularDetailComponent,
    CountryAngularUpdateComponent,
    CountryAngularDeleteDialogComponent
  ],
  entryComponents: [CountryAngularDeleteDialogComponent]
})
export class SappCountryAngularModule {}
