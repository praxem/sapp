import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionAngular } from 'app/shared/model/region-angular.model';

@Component({
  selector: 'jhi-region-angular-detail',
  templateUrl: './region-angular-detail.component.html'
})
export class RegionAngularDetailComponent implements OnInit {
  region: IRegionAngular | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.region = region;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
