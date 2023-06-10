import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { loadCoffees } from 'src/app/store/coffee.actions';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: Store;

  const mockCoffees = [
    { id: 1, name: 'Coffee 1', description: 'Description 1' },
    { id: 2, name: 'Coffee 2', description: 'Description 2' },
    { id: 3, name: 'Coffee 3', description: 'Description 3' },
  ];
  const mockPaginator = {
    firstPage: jasmine.createSpy('firstPage'),
    getNumberOfPages: jasmine.createSpy('getNumberOfPages').and.returnValue(10),
  };

  const paramMap = new BehaviorSubject(convertToParamMap({ id: '1' }));
  const mockActivatedRoute = { paramMap };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        StoreModule.forRoot({}),
        MatPaginatorModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => of(mockCoffees),
            dispatch: jasmine.createSpy('dispatch'),
          },
        },
        { provide: MatPaginator, useValue: mockPaginator },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load coffees', () => {
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCoffees({ page: 1, size: 10 }),
    );
  });

  it('should change page correctly', () => {
    const pageEvent = { pageIndex: 2, pageSize: 20, length: 100 };
    component.pageChanged(pageEvent);

    expect(component.currentPage).toBe(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCoffees({ page: 3, size: 20 }),
    );
  });
});
