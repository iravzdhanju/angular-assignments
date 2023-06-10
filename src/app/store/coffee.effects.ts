import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { loadCoffees, loadCoffeesSuccess } from './coffee.actions';
import { CoffeeService } from '../services/coffee.service';

@Injectable()
export class CoffeeEffects {
  constructor(
    private actions$: Actions,
    private coffeeService: CoffeeService
  ) {}

  loadCoffees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCoffees),
      mergeMap((action) =>
        this.coffeeService
          .getCoffees(action.size, action.page)
          .pipe(map((coffees: any[]) => loadCoffeesSuccess({ coffees })))
      )
    )
  );
}
