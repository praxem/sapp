import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobAngular } from 'app/shared/model/job-angular.model';
import { JobAngularService } from './job-angular.service';

@Component({
  templateUrl: './job-angular-delete-dialog.component.html'
})
export class JobAngularDeleteDialogComponent {
  job?: IJobAngular;

  constructor(protected jobService: JobAngularService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobListModification');
      this.activeModal.close();
    });
  }
}
