export interface CheckoutForm {
  userData: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  userAdress: {
    country: string;
    city: string;
    street: string;
    streetNumber: string;
  };
  payment: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}
