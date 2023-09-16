import {Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Campaign} from "../models/campaign";
import {CampaignService} from "../services/campaign.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-donate-to-campaign',
  templateUrl: './donate-to-campaign.component.html',
  styleUrls: ['./donate-to-campaign.component.css']
})
export class DonateToCampaignComponent implements OnInit{

  donationFrom: FormGroup;
  campaignId = "";
  campaignData: Campaign = new Campaign();

  constructor(private toaster: ToastrService, private fb: FormBuilder, private userService: UserService, private router: ActivatedRoute, private campaignService: CampaignService) {
    this.donationFrom = this.fb.group({
      amount: [0, [Validators.required, Validators.min(10)]],
      comment: [""],
      visibility: [true],
    })
  }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      this.campaignId = params["id"]
      this.campaignService.getCampaignById(this.campaignId).subscribe(
        result =>{
          this.campaignData = result.data
        },error => {
          this.toaster.error("couldn't load campaign data");
        }
      );
    })
  }

  onSubmit(){
    this.userService.paymentInitialize(this.campaignId, this.donationFrom.value)
  }

}
