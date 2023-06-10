import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private apiUrl = 'https://random-data-api.com/api/coffee/random_coffee';
  private coffeeListCache: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) {}

  getCoffees(
    limit: number,
    page: number
  ): Observable<{ coffees: any[]; total: number }> {
    const cachedCoffees = this.coffeeListCache.get(page);
    if (cachedCoffees) {
      return of({ coffees: cachedCoffees, total: 50 });
    }

    return this.http
      .get<any[]>(`${this.apiUrl}?size=${limit}&page=${page}`)
      .pipe(
        tap((data) => {
          this.coffeeListCache.set(page, data);
        }),
        map((data) => ({ coffees: data, total: 50 }))
      );
  }
}
