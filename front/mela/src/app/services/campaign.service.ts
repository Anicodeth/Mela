import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { UserService } from './user.service';
import {Campaign} from "../models/campaign";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient, private userService: UserService, private toast: ToastrService) { }

  getAllCampaigns() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUserDataLocalStorage().token.toString());
    this.http.get('http://localhos:3000/campaigns',{headers})
  }

  getCampaignById(id: string) {

    return this.http.get<{success:Boolean, data: Campaign}>( "http://localhost:3000/api/v1/campaigns/campaign/" + id);
  }
  searchCampignsByTitle(title: string) {

    const params = new HttpParams().set(
      "keyword",title
    );

    return this.http.get<{success: Boolean,data: Campaign[]}>("http://localhost:3000/api/v1/campaigns/search/", {params})
  }

}
