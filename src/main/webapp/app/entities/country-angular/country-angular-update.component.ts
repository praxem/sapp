import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountryAngular, CountryAngular } from 'app/shared/model/country-angular.model';
import { CountryAngularService } from './country-angular.service';
import { IRegionAngular } from 'app/shared/model/region-angular.model';
import { RegionAngularService } from 'app/entities/region-angular/region-angular.service';

@Component({
  selector: 'jhi-country-angular-update',
  templateUrl: './country-angular-update.component.html'
})
export class CountryAngularUpdateComponent implements OnInit {
  isSaving = false;

  regions: IRegionAngular[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    regionId: []
  });

  constructor(
    protected countryService: CountryAngularService,
    protected regionService: RegionAngularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.regionService
        .query({ filter: 'country-is-null' })
        .pipe(
          map((res: HttpResponse<IRegionAngular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRegionAngular[]) => {
          if (!country.regionId) {
            this.regions = resBody;
          } else {
            this.regionService
              .find(country.regionId)
              .pipe(
                map((subRes: HttpResponse<IRegionAngular>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRegionAngular[]) => {
                this.regions = concatRes;
              });
          }
        });
    });
  }

  updateForm(country: ICountryAngular): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      regionId: country.regionId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountryAngular {
    return {
      ...new CountryAngular(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      regionId: this.editForm.get(['regionId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryAngular>>): void {
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

  trackById(index: number, item: IRegionAngular): any {
    return item.id;
  }
}
