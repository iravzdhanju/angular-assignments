import { createReducer, on } from '@ngrx/store';
import { loadCoffeesSuccess } from './coffee.actions';

export const initialState: any[] = [];

export const coffeeReducer = createReducer(
  initialState,
  on(loadCoffeesSuccess, (state, { coffees }) => [...coffees])
);
