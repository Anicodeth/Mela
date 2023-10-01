import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, tap} from "rxjs"

import {User} from "../models/user";
import {RegisterUser} from "../models/registerUser";
import {LoginUser} from "../models/loginUser";
import {CampaignForm} from "../models/campaignForm";
import {FundTag} from "../models/fundTag";
import {ToastrService} from "ngx-toastr";
import {EditProfile} from "../models/editProfile";
import {Router} from "@angular/router";
import {Campaign} from "../models/campaign";
import {transfer} from "../models/transfer";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:BehaviorSubject<User>;

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {
    this.currentUser = new BehaviorSubject<User>(this.getUserDataLocalStorage());
  }

  //get all users
  getAllUsers() {
    return this.http.get('http://localhos:3000/users')
  }

  //get a user by Id
  getUserById(id: string) {

    return this.http.get<{success: Boolean, data: User}>(`http://localhost:3000/api/v1/users/${id}`)

  }

  //login a user
  loginUser(data: LoginUser) {

    this.http.post("http://localhost:3000/api/v1/users/login", data).subscribe(

      (result: any)=>{

        this.toast.success("successfuly logged in");
        this.saveUserDataLocalStorage(result.data)

        this.currentUser.next(result.data as User)

        this.router.navigateByUrl("/")

      },(err)=>{

        console.log(err)
        this.toast.error("login not successful")

      }
    )
  }

  //register a user
  registerUser(data: RegisterUser) {

    this.http.post("http://localhost:3000/api/v1/users/register", data).subscribe(
      (result: any)=>{
        this.saveUserDataLocalStorage(result.data)

        this.currentUser.next(result.data)

        this.toast.success("Successfully registered")

        this.router.navigateByUrl("/")

      }, (err)=>{

        this.toast.error("Registration failed")
      }
    )

  }

  //edit profile
  editImage(image: File){

    const formData: FormData = new FormData();

    formData.append("image", image)

    return this.http.put("http://localhos:3000/api/v1/users/image", image);

  }

  editProfile(editForm: EditProfile){

    return this.http.put("http://localhos:3000/api/v1/users/", editForm);

  }



  //create campaign by a user
  createCampaign(campaignForm: CampaignForm, image: File, tags: FundTag[]) {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUserDataLocalStorage().token);

    const tagsJson = tags.map(tag=>JSON.stringify(tag))

    const formData:FormData = new FormData();

    formData.append("image", image)
    formData.append("description", campaignForm.description)
    formData.append("title", campaignForm.title)
    formData.append("goal", campaignForm.goal.toString())
    formData.append("creatorId", this.currentUser.value._id)

    for (const tagJson of tagsJson){
      formData.append("tags", tagJson)
    }

    return this.http.post<{success: Boolean, data: Campaign}>("http://localhost:3000/api/v1/campaigns", formData)
  }

  paymentInitialize(id:string, donationForm: any){

    const body = {
      ...donationForm,
      email: this.currentUser.value.email,
      phone_number: this.currentUser.value.phoneNumber,
      first_name: this.currentUser.value.firstName,
      last_name: this.currentUser.value.lastName,
      currency: "ETB"
    }

    return this.http.post(`http://localhost:3000/api/v1/campaigns/${id}/payment`, body)
  }

  getBanks(){

    return this.http.get(`http://localhost:3000/api/v1/campaigns/banks`)
  }

  withdrawal(transferData: transfer){

    return this.http.post(`http://localhost:3000/api/v1/campaigns/transfer/${this.currentUser.value._id}`, transferData)
  }

  signOut(){
    const userJson = localStorage.removeItem('user');
    this.currentUser.next(new User())
  }

  //saves the user and the token in local storage
  saveUserDataLocalStorage(data: User) {

    localStorage.setItem('user', JSON.stringify(data));

  }

  //gets the user from the local storage
  getUserDataLocalStorage(): User {
    const userJson = localStorage.getItem('user');

    if (userJson) return JSON.parse(userJson) as User;

    return new User();
  }

}
