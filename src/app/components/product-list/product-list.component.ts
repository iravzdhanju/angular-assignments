import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCoffees } from 'src/app/store/coffee.actions';
import {
  selectAllCoffees as selectCoffees,
  selectTotalCoffees,
} from 'src/app/store/coffee.selectors';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  coffees$!: Observable<any[]>;
  currentPage = 0;
  totalCoffees = 0;

  constructor(private store: Store) {
    this.store
      .select(selectTotalCoffees)
      .subscribe(total => (this.totalCoffees = total));
  }

  ngOnInit(): void {
    this.coffees$ = this.store.select(selectCoffees);
    this.loadCoffees(this.currentPage, 10);
  }

  loadCoffees(pageIndex: number, pageSize: number): void {
    this.store.dispatch(loadCoffees({ page: pageIndex + 1, size: pageSize }));
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.loadCoffees(event.pageIndex, event.pageSize);
  }
}
