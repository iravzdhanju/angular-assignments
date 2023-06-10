import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoffeeState } from './coffee.reducer';

export const selectCoffeeFeature = createFeatureSelector<CoffeeState>('coffee');

export const selectAllCoffees = createSelector(
  selectCoffeeFeature,
  (state: CoffeeState) => state?.coffees ?? []
);

export const selectTotalCoffees = createSelector(
  selectCoffeeFeature,
  (state: CoffeeState) => state?.total ?? 0
);

export const selectLoadingCoffees = createSelector(
  selectCoffeeFeature,
  (state: CoffeeState) => state?.loading ?? false
);
