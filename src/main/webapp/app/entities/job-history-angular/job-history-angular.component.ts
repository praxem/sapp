import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobHistoryAngular } from 'app/shared/model/job-history-angular.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JobHistoryAngularService } from './job-history-angular.service';
import { JobHistoryAngularDeleteDialogComponent } from './job-history-angular-delete-dialog.component';

@Component({
  selector: 'jhi-job-history-angular',
  templateUrl: './job-history-angular.component.html'
})
export class JobHistoryAngularComponent implements OnInit, OnDestroy {
  jobHistories: IJobHistoryAngular[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected jobHistoryService: JobHistoryAngularService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.jobHistories = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.jobHistoryService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJobHistoryAngular[]>) => this.paginateJobHistories(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.jobHistories = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJobHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IJobHistoryAngular): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInJobHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('jobHistoryListModification', () => this.reset());
  }

  delete(jobHistory: IJobHistoryAngular): void {
    const modalRef = this.modalService.open(JobHistoryAngularDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.jobHistory = jobHistory;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateJobHistories(data: IJobHistoryAngular[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.jobHistories.push(data[i]);
      }
    }
  }
}
