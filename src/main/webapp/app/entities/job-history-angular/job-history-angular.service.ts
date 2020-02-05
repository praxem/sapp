import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IJobHistoryAngular } from 'app/shared/model/job-history-angular.model';

type EntityResponseType = HttpResponse<IJobHistoryAngular>;
type EntityArrayResponseType = HttpResponse<IJobHistoryAngular[]>;

@Injectable({ providedIn: 'root' })
export class JobHistoryAngularService {
  public resourceUrl = SERVER_API_URL + 'api/job-histories';

  constructor(protected http: HttpClient) {}

  create(jobHistory: IJobHistoryAngular): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .post<IJobHistoryAngular>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(jobHistory: IJobHistoryAngular): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .put<IJobHistoryAngular>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJobHistoryAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJobHistoryAngular[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(jobHistory: IJobHistoryAngular): IJobHistoryAngular {
    const copy: IJobHistoryAngular = Object.assign({}, jobHistory, {
      startDate: jobHistory.startDate && jobHistory.startDate.isValid() ? jobHistory.startDate.toJSON() : undefined,
      endDate: jobHistory.endDate && jobHistory.endDate.isValid() ? jobHistory.endDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((jobHistory: IJobHistoryAngular) => {
        jobHistory.startDate = jobHistory.startDate ? moment(jobHistory.startDate) : undefined;
        jobHistory.endDate = jobHistory.endDate ? moment(jobHistory.endDate) : undefined;
      });
    }
    return res;
  }
}
