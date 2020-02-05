import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationAngular } from 'app/shared/model/location-angular.model';
import { LocationAngularService } from './location-angular.service';
import { LocationAngularDeleteDialogComponent } from './location-angular-delete-dialog.component';

@Component({
  selector: 'jhi-location-angular',
  templateUrl: './location-angular.component.html'
})
export class LocationAngularComponent implements OnInit, OnDestroy {
  locations?: ILocationAngular[];
  eventSubscriber?: Subscription;

  constructor(
    protected locationService: LocationAngularService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.locationService.query().subscribe((res: HttpResponse<ILocationAngular[]>) => {
      this.locations = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocationAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  delete(location: ILocationAngular): void {
    const modalRef = this.modalService.open(LocationAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }
}
