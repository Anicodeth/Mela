import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user: any;

  getAllUsers() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUserDataLocalStorage().token);
    this.http.get('http://localhos:3000/users', {headers})
  }
  getUserById(id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUserDataLocalStorage().token);
    this.http.get("http://localhost:3000/users/" + id, {headers})
  }

  loginUser(email: string, password: string) {
    this.http.post("http://localhost:3000/users/login", {email, password}).subscribe(
      (result: any)=>{
        this.saveUserDataLocalStorage({"userId":result.id, "token": result.token})
      },(err)=>{
        console.log(err)
      }
    )
  }

  registerUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string) {
    this.http.post("http://localhost:3000/users/register", {email, password, firstName, lastName, phoneNumber})
  }

  createCampaign(title: string, description: string, goal: number, image: string, CreatorId: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getUserDataLocalStorage().token);
    this.http.post("http://localhost:3000/createcampaign", {title, description, goal, image, CreatorId},{headers})
  }

  saveUserDataLocalStorage(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  getUserDataLocalStorage(): any {
    return localStorage.getItem('user');
  }
}
