import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from './department-angular.service';

@Component({
  templateUrl: './department-angular-delete-dialog.component.html'
})
export class DepartmentAngularDeleteDialogComponent {
  department?: IDepartmentAngular;

  constructor(
    protected departmentService: DepartmentAngularService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentListModification');
      this.activeModal.close();
    });
  }
}
