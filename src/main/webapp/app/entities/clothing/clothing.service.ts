import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClothing } from 'app/shared/model/clothing.model';

type EntityResponseType = HttpResponse<IClothing>;
type EntityArrayResponseType = HttpResponse<IClothing[]>;

@Injectable({ providedIn: 'root' })
export class ClothingService {
  public resourceUrl = SERVER_API_URL + 'api/clothing';

  constructor(protected http: HttpClient) {}

  create(clothing: IClothing): Observable<EntityResponseType> {
    return this.http.post<IClothing>(this.resourceUrl, clothing, { observe: 'response' });
  }

  update(clothing: IClothing): Observable<EntityResponseType> {
    return this.http.put<IClothing>(this.resourceUrl, clothing, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClothing>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClothing[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
