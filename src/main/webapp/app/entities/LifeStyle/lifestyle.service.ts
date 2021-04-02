import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILifeStyle } from 'app/shared/model/lifestyle.model';

type EntityResponseType = HttpResponse<ILifeStyle>;
type EntityArrayResponseType = HttpResponse<ILifeStyle[]>;

@Injectable({ providedIn: 'root' })
export class LifeStyleService {
  public resourceUrl = SERVER_API_URL + 'api/lifestyle';

  constructor(protected http: HttpClient) {}

  create(lifestyle: ILifeStyle): Observable<EntityResponseType> {
    return this.http.post<ILifeStyle>(this.resourceUrl, lifestyle, { observe: 'response' });
  }

  update(lifestyle: ILifeStyle): Observable<EntityResponseType> {
    return this.http.put<ILifeStyle>(this.resourceUrl, lifestyle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILifeStyle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILifeStyle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
