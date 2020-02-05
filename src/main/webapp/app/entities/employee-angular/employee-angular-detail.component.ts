import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeAngular } from 'app/shared/model/employee-angular.model';

@Component({
  selector: 'jhi-employee-angular-detail',
  templateUrl: './employee-angular-detail.component.html'
})
export class EmployeeAngularDetailComponent implements OnInit {
  employee: IEmployeeAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
