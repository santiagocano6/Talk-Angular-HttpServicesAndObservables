import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

import { IRecord } from './record.interface';
import { AppSettings } from '../app.settings';

@Injectable()
export class RecordsService {
  private recordsUrl = `${AppSettings.urlWebApi}/comments`;

  constructor(private httpClient: HttpClient) {}

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${tokenValue}`
    });
  }

  getRecords(): Observable<IRecord[]> {
    const headers = this.getHeader();

    // New way
    return this.httpClient.get<IRecord[]>(this.recordsUrl, { headers })
      .retry(3) // Add to retry the get 3 times in case of error
      .catch(this.handleError);

    // Old way
   /*return this.http
      .get(this.recordsUrl, { headers })
      .retry(3)
      .map((response: Response) => {
        const result = response;
        return result;
      })
      .catch(this.handleError);*/
  }

  addRecord(record: IRecord): Observable<IRecord> {
    const headers = this.getHeader();

    return this.httpClient.post<IRecord>(this.recordsUrl, JSON.stringify(record), { headers })
      .catch(this.handleError);

      // Old way
      /*
      return this.http
        .post(this.recordsUrl, JSON.stringify(record), { headers: headers })
        .map((response: Response) => response.json())
        .catch(this.handleError);
       */
  }

  editRecord(record: IRecord): Observable<IRecord> {
    const url = `${this.recordsUrl}/${record.id}`;
    const headers = this.getHeader();

    return this.httpClient.put<IRecord>(url, JSON.stringify(record), { headers })
      .catch(this.handleError);

      // Old way
      /*
      return this.http
        .put(url, JSON.stringify(record), { headers: headers })
        .map((response: Response) => response.json())
        .catch(this.handleError);
       */
  }

  deleteRecord(record: IRecord): Observable<IRecord> {
    const url = `${this.recordsUrl}/${record.id}`;
    const headers = this.getHeader();

    return this.httpClient.delete(url, { headers })
      .catch(this.handleError);

      // Old way
      /*
      return this.http.delete(url, { headers: headers }).catch(this.handleError);
       */
  }

  private handleError(error: any): Observable<any> {
    console.log('An error has been throw up: ' + error);
    return Observable.create((observer: any) => {
      observer.error(error);
      observer.complete();
    });
  }
}
