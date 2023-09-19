export interface Donation {
  first_name: string;
  last_name: string;
  email: string;
  currency: string;
  amount: number;
  charge: number;
  mode: string;
  method: string;
  type: string;
  status: string;
  reference: string;
  tx_ref: string;
  customization: {
    title: string;
    description: string;
    logo: null | string;
  };
  meta: null | any; // Change 'any' to a more specific type if needed
  created_at: string;
  updated_at: string;
}
