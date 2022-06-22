import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICartItem from 'src/app/models/ICartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ICartItem[] | undefined;
  totalPrice!: number;
  subscribtion!: Subscription;
  isThereItems = false;

  //Form
  fullname = '';
  address = '';
  creditCardNumber = '';

  private route!: Router;

  constructor(private cart: CartService) {}

  ngOnInit() {
    console.log(this.cart.getCartItems());
    this.cartItems = this.cart.getCartItems();
    this.totalPrice = this.cart.getTotalPrice();
    this.subscribtion = this.cart.totalPriceSubject.subscribe(
      (data) => (this.totalPrice = data)
    );
    this.isThereItems = this.cartItems.length > 0;
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }

  onSubmit() {
    console.log('submit');
    this.route.navigateByUrl('/confirmation');
  }
}
