import {Timestamp} from "rxjs";

export interface Bank{
  "id": string,
  "slug": string,
  "swift": string,
  "name": string,
  "acct_length": number,
  "country_id": number,
  "created_at": Timestamp<any>,
  "updated_at": Timestamp<any>,
  "active": number,
  "is_24hrs"?: null,
  "is_active": number,
  "is_rtgs"?: null,
  "is_mobilemoney"?: null,
  "currency": string,
}
