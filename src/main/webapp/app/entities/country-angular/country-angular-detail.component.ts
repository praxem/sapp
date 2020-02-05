import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryAngular } from 'app/shared/model/country-angular.model';

@Component({
  selector: 'jhi-country-angular-detail',
  templateUrl: './country-angular-detail.component.html'
})
export class CountryAngularDetailComponent implements OnInit {
  country: ICountryAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.country = country;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
