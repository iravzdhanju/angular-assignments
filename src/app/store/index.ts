import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coffeeReducer } from './coffee.reducer';
import { CoffeeEffects } from './coffee.effects';

export const CoffeeStore = [
  StoreModule.forFeature('coffees', coffeeReducer),
  EffectsModule.forFeature([CoffeeEffects]),
];
