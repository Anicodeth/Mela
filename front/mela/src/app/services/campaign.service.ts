import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getAllCampaigns() {
    this.http.get('http://localhos:3000/campaigns')
  }

  getCampaignById(id: string) {
    this.http.get( "http://localhost:3000/campaigns/" + id)
  }
  searchCampignsByTitle(title: string) {
    this.http.get("http://localhost:3000/campaigns/search/" + title)
  }

}
