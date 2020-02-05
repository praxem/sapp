import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITaskAngular } from 'app/shared/model/task-angular.model';

type EntityResponseType = HttpResponse<ITaskAngular>;
type EntityArrayResponseType = HttpResponse<ITaskAngular[]>;

@Injectable({ providedIn: 'root' })
export class TaskAngularService {
  public resourceUrl = SERVER_API_URL + 'api/tasks';

  constructor(protected http: HttpClient) {}

  create(task: ITaskAngular): Observable<EntityResponseType> {
    return this.http.post<ITaskAngular>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITaskAngular): Observable<EntityResponseType> {
    return this.http.put<ITaskAngular>(this.resourceUrl, task, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskAngular[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
