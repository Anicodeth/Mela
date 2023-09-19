import {Campaign} from "./campaign";

export class User {
  _id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  username?: string;
  phoneNumber!:string;
  socialMedia?: {
    Twitter?: string;
    Instagram?: string;
    LinkedIn?: string;
  };
  bio?: string;
  likes?:number;
  shares?:number;
  raisedMoney?:number;
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date;
  passwordChangedAt?: Date;
  image?: string;
  imageCloudinaryPublicId?: string;
  token!: string;
  campaigns?: Campaign[]
}
