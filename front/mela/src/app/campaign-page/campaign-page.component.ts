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
  loading:boolean = false;
  constructor(private toast: ToastrService, private route: ActivatedRoute, private campaignService: CampaignService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe(paramMap => {
      const paramValue = paramMap.get('campaign-id');
      this.campaignService.getCampaignById(paramValue!).subscribe(
        result => {
          this.campaign = result.data
          this.loading = false
        },error => {
          this.toast.error("couldn't load campaign info")
          this.loading = false
        }
      )
      });

  }
  getTimeSince(timestamp: string): string {
    const currentDate = new Date();
    const pastDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - pastDate.getTime();

    if (timeDifference >= 86400000) {
      const days = Math.floor(timeDifference / 86400000);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 3600000) {
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 60000) {
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return '0 minute ago';
    }
  }
}
