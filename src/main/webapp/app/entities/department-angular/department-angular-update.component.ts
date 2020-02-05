import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDepartmentAngular, DepartmentAngular } from 'app/shared/model/department-angular.model';
import { DepartmentAngularService } from './department-angular.service';
import { ILocationAngular } from 'app/shared/model/location-angular.model';
import { LocationAngularService } from 'app/entities/location-angular/location-angular.service';

@Component({
  selector: 'jhi-department-angular-update',
  templateUrl: './department-angular-update.component.html'
})
export class DepartmentAngularUpdateComponent implements OnInit {
  isSaving = false;

  locations: ILocationAngular[] = [];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required]],
    locationId: []
  });

  constructor(
    protected departmentService: DepartmentAngularService,
    protected locationService: LocationAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.locationService
        .query({ filter: 'department-is-null' })
        .pipe(
          map((res: HttpResponse<ILocationAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ILocationAngular[]) => {
          if (!department.locationId) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(department.locationId)
              .pipe(
                map((subRes: HttpResponse<ILocationAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocationAngular[]) => {
                this.locations = concatRes;
              });
          }
        });
    });
  }

  updateForm(department: IDepartmentAngular): void {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName,
      locationId: department.locationId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentAngular {
    return {
      ...new DepartmentAngular(),
      id: this.editForm.get(['id'])!.value,
      departmentName: this.editForm.get(['departmentName'])!.value,
      locationId: this.editForm.get(['locationId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentAngular>>): void {
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

  trackById(index: number, item: ILocationAngular): any {
    return item.id;
  }
}
