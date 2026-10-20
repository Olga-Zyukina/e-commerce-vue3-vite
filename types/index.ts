export {};

declare global {
  interface ProductsListData {
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
  interface UserData {
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
  interface Cart {
    id: number;
    cart: [
      {
        idProduct: number;
        count: number;
      },
    ];
  }
  interface OrderData {
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
  interface TaxesData {
    id: number;
    title: string;
    value: number;
  }
  interface NormalizeOrdersData {
    id: string;
    date: string;
    status: string;
    totalSum: number;
    products: ItemFullOrdersData[];
  }
  interface NormalizeWishData {
    id: number;
    title: string;
    image: string;
    rate: number;
    count: number;
    price: number;
  }
  interface NormalizeReviewsData {
    idProduct: number;
    date: string;
    rating: number;
    review: string;
    title: string;
    image: string;
    rate: number;
    count: number;
  }
  type ItemFullOrdersData = {
    idProduct: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
  };
  type CartData = ProductsListData & {
    quantity: number;
  }

}
