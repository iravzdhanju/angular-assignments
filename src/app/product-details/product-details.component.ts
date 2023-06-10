import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllCoffees as selectCoffees } from '../store/coffee.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  coffeeId: string;
  coffeeDetails: any;
  coffees$ = this.store.select(selectCoffees);

  constructor(private route: ActivatedRoute, private store: Store) {
    this.coffeeId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.coffees$.subscribe((coffees) => {
      this.coffeeDetails = coffees.find(
        (coffee) => coffee.id === +this.coffeeId
      );
    });
  }
}
