import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllCampaigns() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUserDataLocalStorage().token);
    this.http.get('http://localhos:3000/campaigns',{headers})
  }

  getCampaignById(id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUserDataLocalStorage().token);
    this.http.get( "http://localhost:3000/campaigns/" + id, {headers})
  }
  searchCampignsByTitle(title: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUserDataLocalStorage().token);
    this.http.get("http://localhost:3000/campaigns/search/" + title, {headers})
  }

}
