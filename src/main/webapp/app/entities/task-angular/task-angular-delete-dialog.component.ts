import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskAngular } from 'app/shared/model/task-angular.model';
import { TaskAngularService } from './task-angular.service';

@Component({
  templateUrl: './task-angular-delete-dialog.component.html'
})
export class TaskAngularDeleteDialogComponent {
  task?: ITaskAngular;

  constructor(protected taskService: TaskAngularService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskListModification');
      this.activeModal.close();
    });
  }
}
