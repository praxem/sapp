import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from './department-angular.service';
import { DepartmentAngularDeleteDialogComponent } from './department-angular-delete-dialog.component';

@Component({
  selector: 'jhi-department-angular',
  templateUrl: './department-angular.component.html'
})
export class DepartmentAngularComponent implements OnInit, OnDestroy {
  departments?: IDepartmentAngular[];
  eventSubscriber?: Subscription;

  constructor(
    protected departmentService: DepartmentAngularService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentAngular[]>) => {
      this.departments = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentAngular): void {
    const modalRef = this.modalService.open(DepartmentAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
