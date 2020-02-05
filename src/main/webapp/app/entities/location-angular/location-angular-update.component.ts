import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILocationAngular, LocationAngular } from 'app/shared/model/location-angular.model';
import { LocationAngularService } from './location-angular.service';
import { ICountryAngular } from 'app/shared/model/country-angular.model';
import { CountryAngularService } from 'app/entities/country-angular/country-angular.service';

@Component({
  selector: 'jhi-location-angular-update',
  templateUrl: './location-angular-update.component.html'
})
export class LocationAngularUpdateComponent implements OnInit {
  isSaving = false;

  countries: ICountryAngular[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    countryId: []
  });

  constructor(
    protected locationService: LocationAngularService,
    protected countryService: CountryAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.countryService
        .query({ filter: 'location-is-null' })
        .pipe(
          map((res: HttpResponse<ICountryAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICountryAngular[]) => {
          if (!location.countryId) {
            this.countries = resBody;
          } else {
            this.countryService
              .find(location.countryId)
              .pipe(
                map((subRes: HttpResponse<ICountryAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICountryAngular[]) => {
                this.countries = concatRes;
              });
          }
        });
    });
  }

  updateForm(location: ILocationAngular): void {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      countryId: location.countryId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocationAngular {
    return {
      ...new LocationAngular(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      countryId: this.editForm.get(['countryId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationAngular>>): void {
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

  trackById(index: number, item: ICountryAngular): any {
    return item.id;
  }
}
