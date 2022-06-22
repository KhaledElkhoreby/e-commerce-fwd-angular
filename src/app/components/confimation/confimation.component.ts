import { Component, OnInit } from '@angular/core';
import ICheckout from 'src/app/models/ICheckout';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.css'],
})
export class ConfimationComponent implements OnInit {
  checkoutInfo!: ICheckout;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.checkoutInfo = this.cart.getCheckoutInfo();
  }
}
