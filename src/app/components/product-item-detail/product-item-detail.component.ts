import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import IProduct from 'src/app/models/IProduct';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product: IProduct | undefined;
  id!: number;
  amount: number = 1;

  constructor(
    private http: ProductsService,
    private route: ActivatedRoute,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.http.getProducts().subscribe((products) => {
      this.product = products.find((product) => product.id === this.id);
    });
  }

  inputChangeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.amount = +value;
  }
  addToCartHander() {
    console.log(this.product);
    this.cart.addCartItem(this.product!, this.amount);
  }
}
