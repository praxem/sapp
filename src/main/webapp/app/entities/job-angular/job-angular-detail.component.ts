import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobAngular } from 'app/shared/model/job-angular.model';

@Component({
  selector: 'jhi-job-angular-detail',
  templateUrl: './job-angular-detail.component.html'
})
export class JobAngularDetailComponent implements OnInit {
  job: IJobAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
