import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryAngular } from 'app/shared/model/job-history-angular.model';

@Component({
  selector: 'jhi-job-history-angular-detail',
  templateUrl: './job-history-angular-detail.component.html'
})
export class JobHistoryAngularDetailComponent implements OnInit {
  jobHistory: IJobHistoryAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.jobHistory = jobHistory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
