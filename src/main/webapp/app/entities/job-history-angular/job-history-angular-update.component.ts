import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobHistoryAngular, JobHistoryAngular } from 'app/shared/model/job-history-angular.model';
import { JobHistoryAngularService } from './job-history-angular.service';
import { IJobAngular } from 'app/shared/model/job-angular.model';
import { JobAngularService } from 'app/entities/job-angular/job-angular.service';
import { IDepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from 'app/entities/department-angular/department-angular.service';
import { IEmployeeAngular } from 'app/shared/model/employee-angular.model';
import { EmployeeAngularService } from 'app/entities/employee-angular/employee-angular.service';

type SelectableEntity = IJobAngular | IDepartmentAngular | IEmployeeAngular;

@Component({
  selector: 'jhi-job-history-angular-update',
  templateUrl: './job-history-angular-update.component.html'
})
export class JobHistoryAngularUpdateComponent implements OnInit {
  isSaving = false;

  jobs: IJobAngular[] = [];

  departments: IDepartmentAngular[] = [];

  employees: IEmployeeAngular[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    jobId: [],
    departmentId: [],
    employeeId: []
  });

  constructor(
    protected jobHistoryService: JobHistoryAngularService,
    protected jobService: JobAngularService,
    protected departmentService: DepartmentAngularService,
    protected employeeService: EmployeeAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.updateForm(jobHistory);

      this.jobService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IJobAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IJobAngular[]) => {
          if (!jobHistory.jobId) {
            this.jobs = resBody;
          } else {
            this.jobService
              .find(jobHistory.jobId)
              .pipe(
                map((subRes: HttpResponse<IJobAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IJobAngular[]) => {
                this.jobs = concatRes;
              });
          }
        });

      this.departmentService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IDepartmentAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDepartmentAngular[]) => {
          if (!jobHistory.departmentId) {
            this.departments = resBody;
          } else {
            this.departmentService
              .find(jobHistory.departmentId)
              .pipe(
                map((subRes: HttpResponse<IDepartmentAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDepartmentAngular[]) => {
                this.departments = concatRes;
              });
          }
        });

      this.employeeService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IEmployeeAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmployeeAngular[]) => {
          if (!jobHistory.employeeId) {
            this.employees = resBody;
          } else {
            this.employeeService
              .find(jobHistory.employeeId)
              .pipe(
                map((subRes: HttpResponse<IEmployeeAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmployeeAngular[]) => {
                this.employees = concatRes;
              });
          }
        });
    });
  }

  updateForm(jobHistory: IJobHistoryAngular): void {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate != null ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate != null ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      jobId: jobHistory.jobId,
      departmentId: jobHistory.departmentId,
      employeeId: jobHistory.employeeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistoryAngular {
    return {
      ...new JobHistoryAngular(),
      id: this.editForm.get(['id'])!.value,
      startDate:
        this.editForm.get(['startDate'])!.value != null ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value != null ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
      jobId: this.editForm.get(['jobId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryAngular>>): void {
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
