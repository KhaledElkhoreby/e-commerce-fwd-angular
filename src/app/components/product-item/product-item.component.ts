import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import IProduct from 'src/app/models/IProduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;
  amount: number = 1;
  subscribtion!: Subscription;
  constructor(private cart: CartService) {}

  ngOnInit(): void {}

  inputChangeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.amount = +value;
  }

  addToCartHander() {
    this.cart.addCartItem(this.product, this.amount);
  }
}
