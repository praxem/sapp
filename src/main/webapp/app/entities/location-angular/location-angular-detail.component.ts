import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationAngular } from 'app/shared/model/location-angular.model';

@Component({
  selector: 'jhi-location-angular-detail',
  templateUrl: './location-angular-detail.component.html'
})
export class LocationAngularDetailComponent implements OnInit {
  location: ILocationAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.location = location;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
