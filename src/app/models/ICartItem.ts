import IProduct from './IProduct';

export default interface ICartItem extends IProduct {
  amount: number;
  totalPrice: number;
}
