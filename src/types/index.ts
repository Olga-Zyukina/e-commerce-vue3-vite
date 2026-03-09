export interface ProductsListData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  count: number;
  rating: {
    rate: number;
    count: number;
  };
}
export type CartItemsData = ProductsListData & {
  quantity: number;
};
export interface PersonData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  status: string;
  orderUpdates: boolean;
  promotions: boolean;
  newsLetter: boolean;
  password: string;
  paymentMethods: [
    {
      paySystem: string;
      number: string;
      expires: string;
    },
  ];
  reviews: [
    {
      idProduct: number;
      rating: number;
      data: string;
      review: string;
    },
  ];
  wish: number[];
}
export interface OrderData {
  idPerson: number;
  orders: [
    {
      id: string;
      date: string;
      status: string;
      products: [
        {
          idProduct: number;
          quantity: number;
          price: number;
        },
      ];
    },
  ];
}
export interface TaxesData {
  id: number;
  title: string;
  value: number;
}
export interface NormalizeOrdersData {
  id: string;
  date: string;
  status: string;
  totalSum: number;
  products: ItemFullOrdersData[];
}
export type ItemFullOrdersData = {
  idProduct: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};
export interface NormalizeWishData {
  id: number;
  title: string;
  image: string;
  rate: number;
  count: number;
  price: number;
}
export interface NormalizeReviewsData {
  idProduct: number;
  date: string;
  rating: number;
  review: string;
  title: string;
  image: string;
  rate: number;
  count: number;
}