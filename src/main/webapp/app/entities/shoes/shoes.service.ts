import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IShoes } from 'app/shared/model/shoes.model';

type EntityResponseType = HttpResponse<IShoes>;
type EntityArrayResponseType = HttpResponse<IShoes[]>;

@Injectable({ providedIn: 'root' })
export class ShoesService {
  public resourceUrl = SERVER_API_URL + 'api/shoes';

  constructor(protected http: HttpClient) {}

  create(shoes: IShoes): Observable<EntityResponseType> {
    return this.http.post<IShoes>(this.resourceUrl, shoes, { observe: 'response' });
  }

  update(shoes: IShoes): Observable<EntityResponseType> {
    return this.http.put<IShoes>(this.resourceUrl, shoes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShoes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShoes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
