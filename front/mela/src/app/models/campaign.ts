import {Donation} from "./donation"
import {User} from "./user";

export class Campaign {
  _id!:string
  title!: string;
  description!: string;
  goal!: number;
  donatedMoney!: number;
  donations!: Donation[];
  imageUrl?: string;
  isOpen!: boolean;
  createdAt!: string;
  creatorId!: string;
  creator?: User;
  tags!: string[];
  relatedCampaigns?: Campaign[];
}
