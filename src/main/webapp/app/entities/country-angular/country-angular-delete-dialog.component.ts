import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryAngular } from 'app/shared/model/country-angular.model';
import { CountryAngularService } from './country-angular.service';

@Component({
  templateUrl: './country-angular-delete-dialog.component.html'
})
export class CountryAngularDeleteDialogComponent {
  country?: ICountryAngular;

  constructor(
    protected countryService: CountryAngularService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countryListModification');
      this.activeModal.close();
    });
  }
}
