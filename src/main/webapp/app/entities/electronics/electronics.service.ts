import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IElectronics } from 'app/shared/model/electronics.model';

type EntityResponseType = HttpResponse<IElectronics>;
type EntityArrayResponseType = HttpResponse<IElectronics[]>;

@Injectable({ providedIn: 'root' })
export class ElectronicsService {
  public resourceUrl = SERVER_API_URL + 'api/electronics';

  constructor(protected http: HttpClient) {}

  create(electronics: IElectronics): Observable<EntityResponseType> {
    return this.http.post<IElectronics>(this.resourceUrl, electronics, { observe: 'response' });
  }

  update(electronics: IElectronics): Observable<EntityResponseType> {
    return this.http.put<IElectronics>(this.resourceUrl, electronics, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IElectronics>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElectronics[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
