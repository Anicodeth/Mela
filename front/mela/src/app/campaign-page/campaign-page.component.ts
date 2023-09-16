import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {CampaignService} from "../services/campaign.service";
import {Campaign} from "../models/campaign";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.css']
})
export class CampaignPageComponent implements OnInit {

  campaign: Campaign = new Campaign();

  donationVisibility = false;
  constructor(private toast: ToastrService, private route: ActivatedRoute, private campaignService: CampaignService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const paramValue = paramMap.get('campaign-id');
      this.campaignService.getCampaignById(paramValue!).subscribe(
        result => {
          this.campaign = result.data
          console.log(this.campaign)
        },error => {
          this.toast.error("couldn't load campaign info")
        }
      )
      });

  }

  protected readonly Math = Math;
}
