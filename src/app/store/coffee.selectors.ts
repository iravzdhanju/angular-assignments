import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCoffeeState = createFeatureSelector<any[]>('coffees');

export const selectCoffees = createSelector(
  selectCoffeeState,
  (state: any[]) => state
);
