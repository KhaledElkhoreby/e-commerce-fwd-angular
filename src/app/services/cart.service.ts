import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ICartItem from '../models/ICartItem';
import ICheckout from '../models/ICheckout';
import IProduct from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _totalAmount = 0;
  private _totalPrice = 0;
  private _cartItems: ICartItem[] = [];
  totalPriceSubject = new Subject<number>();
  private _checkoutInfo!: ICheckout;

  constructor() {}

  addCartItem(product: IProduct, amount: number) {
    console.log(product);
    const index = this._cartItems.findIndex((item) => item.id === product.id);
    console.log({ index });

    if (index != -1) {
      const existingProduct = this._cartItems[index];

      this._totalAmount -= existingProduct.amount;
      this._totalPrice -= existingProduct.totalPrice;

      existingProduct.amount = amount;
      existingProduct.totalPrice =
        existingProduct.amount * existingProduct.price;

      this._cartItems[index] = existingProduct;

      this._totalAmount += existingProduct.amount;
      this._totalPrice += this.fixedPriceDecimals(existingProduct.totalPrice);
    } else {
      const newItem: ICartItem = {
        ...product,
        amount,
        totalPrice: product.price * amount,
      };
      this._cartItems = [...this._cartItems, newItem];
      this._totalAmount += amount;
      this._totalPrice += this.fixedPriceDecimals(newItem.totalPrice);
    }

    console.log(this._cartItems);
    console.log(this._totalAmount);
    console.log(this._totalPrice);

    this.totalPriceSubject.next(this.fixedPriceDecimals(this._totalPrice));
  }

  getCartItems() {
    return this._cartItems;
  }

  getTotalPrice() {
    return this.fixedPriceDecimals(this._totalPrice);
  }

  addCheckoutInfo(checkoutInfo: ICheckout) {
    this._checkoutInfo = checkoutInfo;
  }

  getCheckoutInfo() {
    return this._checkoutInfo;
  }

  fixedPriceDecimals(num: number) {
    return +(Math.round(num * 100) / 100).toFixed(2);
  }
}
