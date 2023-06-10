import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loadCoffees, loadCoffeesSuccess } from './coffee.actions';

@Injectable()
export class CoffeeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadCoffees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCoffees),
      mergeMap((action) =>
        this.http
          .get<any[]>(
            `https://random-data-api.com/api/coffee/random_coffee?size=50&page=${action.page}`
          )
          .pipe(map((coffees: any[]) => loadCoffeesSuccess({ coffees })))
      )
    )
  );
}
