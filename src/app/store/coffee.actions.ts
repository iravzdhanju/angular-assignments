import { createAction, props } from '@ngrx/store';

export const loadCoffees = createAction(
  '[Coffee] Load Coffees',
  props<{ page: number; size: number }>()
);
export const loadCoffeesSuccess = createAction(
  '[Coffee] Load Coffees Success',
  props<{ coffees: any[]; total: number }>()
);
