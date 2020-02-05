import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IJobAngular, JobAngular } from 'app/shared/model/job-angular.model';
import { JobAngularService } from './job-angular.service';
import { ITaskAngular } from 'app/shared/model/task-angular.model';
import { TaskAngularService } from 'app/entities/task-angular/task-angular.service';
import { IEmployeeAngular } from 'app/shared/model/employee-angular.model';
import { EmployeeAngularService } from 'app/entities/employee-angular/employee-angular.service';

type SelectableEntity = ITaskAngular | IEmployeeAngular;

@Component({
  selector: 'jhi-job-angular-update',
  templateUrl: './job-angular-update.component.html'
})
export class JobAngularUpdateComponent implements OnInit {
  isSaving = false;

  tasks: ITaskAngular[] = [];

  employees: IEmployeeAngular[] = [];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employeeId: []
  });

  constructor(
    protected jobService: JobAngularService,
    protected taskService: TaskAngularService,
    protected employeeService: EmployeeAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);

      this.taskService
        .query()
        .pipe(
          map((res: HttpResponse<ITaskAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITaskAngular[]) => (this.tasks = resBody));

      this.employeeService
        .query()
        .pipe(
          map((res: HttpResponse<IEmployeeAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmployeeAngular[]) => (this.employees = resBody));
    });
  }

  updateForm(job: IJobAngular): void {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employeeId: job.employeeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJobAngular {
    return {
      ...new JobAngular(),
      id: this.editForm.get(['id'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      minSalary: this.editForm.get(['minSalary'])!.value,
      maxSalary: this.editForm.get(['maxSalary'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobAngular>>): void {
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

  getSelected(selectedVals: ITaskAngular[], option: ITaskAngular): ITaskAngular {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
