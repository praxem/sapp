import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartmentAngular } from 'app/shared/model/department-angular.model';

type EntityResponseType = HttpResponse<IDepartmentAngular>;
type EntityArrayResponseType = HttpResponse<IDepartmentAngular[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentAngularService {
  public resourceUrl = SERVER_API_URL + 'api/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartmentAngular): Observable<EntityResponseType> {
    return this.http.post<IDepartmentAngular>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentAngular): Observable<EntityResponseType> {
    return this.http.put<IDepartmentAngular>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentAngular[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
