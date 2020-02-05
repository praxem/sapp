import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionAngular } from 'app/shared/model/region-angular.model';
import { RegionAngularService } from './region-angular.service';

@Component({
  templateUrl: './region-angular-delete-dialog.component.html'
})
export class RegionAngularDeleteDialogComponent {
  region?: IRegionAngular;

  constructor(protected regionService: RegionAngularService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regionListModification');
      this.activeModal.close();
    });
  }
}
