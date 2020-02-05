import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IJobAngular } from 'app/shared/model/job-angular.model';

type EntityResponseType = HttpResponse<IJobAngular>;
type EntityArrayResponseType = HttpResponse<IJobAngular[]>;

@Injectable({ providedIn: 'root' })
export class JobAngularService {
  public resourceUrl = SERVER_API_URL + 'api/jobs';

  constructor(protected http: HttpClient) {}

  create(job: IJobAngular): Observable<EntityResponseType> {
    return this.http.post<IJobAngular>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJobAngular): Observable<EntityResponseType> {
    return this.http.put<IJobAngular>(this.resourceUrl, job, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobAngular[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
