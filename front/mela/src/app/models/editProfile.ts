export interface EditProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  socialMedia?: {
    Twitter?: string;
    Instagram?: string;
    LinkedIn?: string;
  }
}
