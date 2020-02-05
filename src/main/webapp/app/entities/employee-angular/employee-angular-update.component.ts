import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmployeeAngular, EmployeeAngular } from 'app/shared/model/employee-angular.model';
import { EmployeeAngularService } from './employee-angular.service';
import { IDepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from 'app/entities/department-angular/department-angular.service';

type SelectableEntity = IEmployeeAngular | IDepartmentAngular;

@Component({
  selector: 'jhi-employee-angular-update',
  templateUrl: './employee-angular-update.component.html'
})
export class EmployeeAngularUpdateComponent implements OnInit {
  isSaving = false;

  employees: IEmployeeAngular[] = [];

  departments: IDepartmentAngular[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    hireDate: [],
    salary: [],
    commissionPct: [],
    managerId: [],
    departmentId: []
  });

  constructor(
    protected employeeService: EmployeeAngularService,
    protected departmentService: DepartmentAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);

      this.employeeService
        .query()
        .pipe(
          map((res: HttpResponse<IEmployeeAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmployeeAngular[]) => (this.employees = resBody));

      this.departmentService
        .query()
        .pipe(
          map((res: HttpResponse<IDepartmentAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDepartmentAngular[]) => (this.departments = resBody));
    });
  }

  updateForm(employee: IEmployeeAngular): void {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate: employee.hireDate != null ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      salary: employee.salary,
      commissionPct: employee.commissionPct,
      managerId: employee.managerId,
      departmentId: employee.departmentId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployeeAngular {
    return {
      ...new EmployeeAngular(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      hireDate:
        this.editForm.get(['hireDate'])!.value != null ? moment(this.editForm.get(['hireDate'])!.value, DATE_TIME_FORMAT) : undefined,
      salary: this.editForm.get(['salary'])!.value,
      commissionPct: this.editForm.get(['commissionPct'])!.value,
      managerId: this.editForm.get(['managerId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeAngular>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
