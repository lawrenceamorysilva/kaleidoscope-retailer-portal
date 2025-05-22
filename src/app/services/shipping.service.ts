import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private apiUrl = 'http://api.localhost:8000/api';

  constructor(private http: HttpClient) {}

  getShippingCost(
    postcode: string,
    suburb: string,
    weight: number
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/shipping/cost`, {
      params: { postcode, suburb, weight: weight.toString() },
    });
  }
}
