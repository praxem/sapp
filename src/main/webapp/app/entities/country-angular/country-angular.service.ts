import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICountryAngular } from 'app/shared/model/country-angular.model';

type EntityResponseType = HttpResponse<ICountryAngular>;
type EntityArrayResponseType = HttpResponse<ICountryAngular[]>;

@Injectable({ providedIn: 'root' })
export class CountryAngularService {
  public resourceUrl = SERVER_API_URL + 'api/countries';

  constructor(protected http: HttpClient) {}

  create(country: ICountryAngular): Observable<EntityResponseType> {
    return this.http.post<ICountryAngular>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryAngular): Observable<EntityResponseType> {
    return this.http.put<ICountryAngular>(this.resourceUrl, country, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryAngular>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryAngular[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
