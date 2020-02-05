import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentAngular } from 'app/shared/model/department-angular.model';

@Component({
  selector: 'jhi-department-angular-detail',
  templateUrl: './department-angular-detail.component.html'
})
export class DepartmentAngularDetailComponent implements OnInit {
  department: IDepartmentAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
