import { Action, createReducer, on } from '@ngrx/store';
import { loadCoffees, loadCoffeesSuccess } from './coffee.actions';

export interface CoffeeState {
  coffees: any[];
  loading: boolean;
  error: any;
  total: number;
}

export const initialState: CoffeeState = {
  coffees: [],
  total: 0,
  loading: false,
  error: null,
};

export const coffeeReducer = createReducer(
  initialState,
  on(loadCoffees, state => ({ ...state, loading: true })),
  on(loadCoffeesSuccess, (state, { coffees, total }) => ({
    ...state,
    coffees,
    total,
    loading: false,
  })),
);
export function reducer(state: CoffeeState | undefined, action: Action) {
  return coffeeReducer(state, action);
}
