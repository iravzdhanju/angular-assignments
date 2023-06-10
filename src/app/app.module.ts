import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { coffeeReducer } from './store/coffee.reducer';
import { CoffeeEffects } from './store/coffee.effects';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeStore } from './store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...CoffeeStore,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  exports: [MatToolbarModule, MatButtonModule, MatPaginatorModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
