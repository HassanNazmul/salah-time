export interface Mosque {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: string[];
  services: string[];
  distance?: number | null;
}