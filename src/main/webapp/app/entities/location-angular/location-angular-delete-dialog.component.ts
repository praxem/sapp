import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationAngular } from 'app/shared/model/location-angular.model';
import { LocationAngularService } from './location-angular.service';

@Component({
  templateUrl: './location-angular-delete-dialog.component.html'
})
export class LocationAngularDeleteDialogComponent {
  location?: ILocationAngular;

  constructor(
    protected locationService: LocationAngularService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('locationListModification');
      this.activeModal.close();
    });
  }
}
