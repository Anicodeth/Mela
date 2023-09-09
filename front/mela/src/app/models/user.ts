export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  username?: string;
  password!: string;
  socialMedia?: {
    Twitter?: string;
    Instagram?: string;
    LinkedIn?: string;
  };
  bio?: string;
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date;
  passwordChangedAt?: Date;
  image?: string;
  imageCloudinaryPublicId?: string;
  token!: string;


}
