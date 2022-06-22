import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ICartItem from 'src/app/models/ICartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ICartItem;
  newAmount = 1;

  constructor(private cart: CartService) {}

  ngOnInit(): void {}

  inputChangeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newAmount = +value;
    const { id, name, price, url, description } = this.cartItem;
    this.cart.addCartItem(
      { id, name, price, url, description },
      this.newAmount
    );
  }
}
