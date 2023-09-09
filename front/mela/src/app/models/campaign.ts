import {Donation} from "./donation"

export interface Campaign {
  title: string;
  description: string;
  goal: number;
  donated_money: number;
  donations: Donation[];
  imageUrl: string;
  is_open: boolean;
  date_created?: Date;
  creator_id?: string;
  tags?: string[];
}
