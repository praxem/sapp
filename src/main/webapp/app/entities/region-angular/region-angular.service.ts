import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRegionAngular } from 'app/shared/model/region-angular.model';

type EntityResponseType = HttpResponse<IRegionAngular>;
type EntityArrayResponseType = HttpResponse<IRegionAngular[]>;

@Injectable({ providedIn: 'root' })
export class RegionAngularService {
  public resourceUrl = SERVER_API_URL + 'api/regions';

  constructor(protected http: HttpClient) {}

  create(region: IRegionAngular): Observable<EntityResponseType> {
    return this.http.post<IRegionAngular>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionAngular): Observable<EntityResponseType> {
    return this.http.put<IRegionAngular>(this.resourceUrl, region, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionAngular[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
