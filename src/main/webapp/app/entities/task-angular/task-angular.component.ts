import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskAngular } from 'app/shared/model/task-angular.model';
import { TaskAngularService } from './task-angular.service';
import { TaskAngularDeleteDialogComponent } from './task-angular-delete-dialog.component';

@Component({
  selector: 'jhi-task-angular',
  templateUrl: './task-angular.component.html'
})
export class TaskAngularComponent implements OnInit, OnDestroy {
  tasks?: ITaskAngular[];
  eventSubscriber?: Subscription;

  constructor(protected taskService: TaskAngularService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.taskService.query().subscribe((res: HttpResponse<ITaskAngular[]>) => {
      this.tasks = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaskAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }

  delete(task: ITaskAngular): void {
    const modalRef = this.modalService.open(TaskAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
  }
}
