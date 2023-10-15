export interface IPriceOffers {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  seatAvailability: number;
  price: {
    amount: number;
    currency: string;
  };
  offerType: string;
  uuid: string;
}

export interface ISelectedFlightOptionData {
  departure: string;
  destination: string;
  departureDate: Date;
  destinationDate: Date;
}
