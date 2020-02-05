import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeAngular } from 'app/shared/model/employee-angular.model';
import { EmployeeAngularService } from './employee-angular.service';

@Component({
  templateUrl: './employee-angular-delete-dialog.component.html'
})
export class EmployeeAngularDeleteDialogComponent {
  employee?: IEmployeeAngular;

  constructor(
    protected employeeService: EmployeeAngularService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeListModification');
      this.activeModal.close();
    });
  }
}
