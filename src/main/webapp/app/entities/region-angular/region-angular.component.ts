import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionAngular } from 'app/shared/model/region-angular.model';
import { RegionAngularService } from './region-angular.service';
import { RegionAngularDeleteDialogComponent } from './region-angular-delete-dialog.component';

@Component({
  selector: 'jhi-region-angular',
  templateUrl: './region-angular.component.html'
})
export class RegionAngularComponent implements OnInit, OnDestroy {
  regions?: IRegionAngular[];
  eventSubscriber?: Subscription;

  constructor(protected regionService: RegionAngularService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.regionService.query().subscribe((res: HttpResponse<IRegionAngular[]>) => {
      this.regions = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegionAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegions(): void {
    this.eventSubscriber = this.eventManager.subscribe('regionListModification', () => this.loadAll());
  }

  delete(region: IRegionAngular): void {
    const modalRef = this.modalService.open(RegionAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.region = region;
  }
}
