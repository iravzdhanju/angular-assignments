import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private apiUrl = 'https://random-data-api.com/api/coffee/random_coffee';
  private coffeeListCache: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) {}

  getCoffees(limit: number, page: number): Observable<any[]> {
    const cachedCoffees = this.coffeeListCache.get(page);
    if (cachedCoffees) {
      return of(cachedCoffees);
    }

    return this.http
      .get<any[]>(`${this.apiUrl}?size=${limit}&page=${page}`)
      .pipe(
        tap((data) => {
          this.coffeeListCache.set(page, data);
        })
      );
  }
}
