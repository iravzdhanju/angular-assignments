import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCoffees } from 'src/app/store/coffee.actions';
import { selectCoffees } from 'src/app/store/coffee.selectors';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  coffees$: Observable<any[]>;
  currentPage = 0;
  totalCoffees = 0;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.coffees$ = this.store.select(selectCoffees);
  }

  ngOnInit(): void {
    this.loadCoffees(this.currentPage, 10);
  }
  loadCoffees(pageIndex: number, pageSize: number): void {
    this.store.dispatch(loadCoffees({ page: pageIndex + 1, size: pageSize }));

    this.coffees$.subscribe((data: any) => {
      this.totalCoffees = data.length;
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex;
    this.loadCoffees(event.pageIndex, event.pageSize);
  }
}

//
