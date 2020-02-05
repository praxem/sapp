import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskAngular } from 'app/shared/model/task-angular.model';

@Component({
  selector: 'jhi-task-angular-detail',
  templateUrl: './task-angular-detail.component.html'
})
export class TaskAngularDetailComponent implements OnInit {
  task: ITaskAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
