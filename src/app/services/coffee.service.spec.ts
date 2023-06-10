import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoffeeService } from './coffee.service';
import { of } from 'rxjs';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoffeeService],
    });
    service = TestBed.inject(CoffeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve coffees from cache if available', () => {
    const cachedCoffees = [
      { id: 1, name: 'Coffee 1' },
      { id: 2, name: 'Coffee 2' },
    ];
    service['coffeeListCache'].set(1, cachedCoffees);

    const result$ = service.getCoffees(10, 1);

    result$.subscribe(result => {
      expect(result.coffees).toEqual(cachedCoffees);
      expect(result.total).toBe(50);
    });
  });

  it('should retrieve coffees from the API if not available in cache', () => {
    const apiResponse = [
      { id: 1, name: 'Coffee 1' },
      { id: 2, name: 'Coffee 2' },
    ];
    spyOn(service['http'], 'get').and.returnValue(of(apiResponse));

    const result$ = service.getCoffees(10, 2);

    result$.subscribe(result => {
      expect(service['coffeeListCache'].get(2)).toEqual(apiResponse);
      expect(result.coffees).toEqual(apiResponse);
      expect(result.total).toBe(50);
      expect(service['http'].get).toHaveBeenCalledWith(
        `${service['apiUrl']}?size=10&page=2`,
      );
    });
  });
});
