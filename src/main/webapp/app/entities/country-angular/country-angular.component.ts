import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryAngular } from 'app/shared/model/country-angular.model';
import { CountryAngularService } from './country-angular.service';
import { CountryAngularDeleteDialogComponent } from './country-angular-delete-dialog.component';

@Component({
  selector: 'jhi-country-angular',
  templateUrl: './country-angular.component.html'
})
export class CountryAngularComponent implements OnInit, OnDestroy {
  countries?: ICountryAngular[];
  eventSubscriber?: Subscription;

  constructor(protected countryService: CountryAngularService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.countryService.query().subscribe((res: HttpResponse<ICountryAngular[]>) => {
      this.countries = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountryAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  delete(country: ICountryAngular): void {
    const modalRef = this.modalService.open(CountryAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
