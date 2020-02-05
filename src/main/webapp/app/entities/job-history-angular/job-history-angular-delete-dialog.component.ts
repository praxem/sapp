import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryAngular } from 'app/shared/model/job-history-angular.model';
import { JobHistoryAngularService } from './job-history-angular.service';

@Component({
  templateUrl: './job-history-angular-delete-dialog.component.html'
})
export class JobHistoryAngularDeleteDialogComponent {
  jobHistory?: IJobHistoryAngular;

  constructor(
    protected jobHistoryService: JobHistoryAngularService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobHistoryListModification');
      this.activeModal.close();
    });
  }
}
