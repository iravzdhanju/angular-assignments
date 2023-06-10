import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { coffeeReducer } from './store/coffee.reducer';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeStore } from './store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-ui-module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...CoffeeStore,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forFeature('coffee', coffeeReducer),
  ],
  exports: [MatToolbarModule, MatButtonModule, MatPaginatorModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
