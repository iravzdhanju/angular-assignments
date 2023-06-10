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

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.coffees$ = this.store.select(selectCoffees);
  }

  ngOnInit(): void {
    this.loadCoffees(this.currentPage, 10);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageChanged(event);
    });
    this.cdr.detectChanges();
  }

  loadCoffees(pageIndex: number, pageSize: number): void {
    this.store.dispatch(loadCoffees({ page: pageIndex + 1, size: pageSize }));
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex;
    this.loadCoffees(event.pageIndex, event.pageSize);

    this.paginator.page.emit(event);
  }
}
