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
  loading:boolean = false;

  constructor(private toast: ToastrService, private fb: FormBuilder, private userService: UserService, private router: ActivatedRoute, private campaignService: CampaignService) {
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
          this.toast.error("couldn't load campaign data");
        }
      );
    })
  }

  onSubmit(){
    if (this.donationFrom.invalid){
      this.toast.error("please provide the required information")
      return
    }


    this.loading = true;
    this.userService.paymentInitialize(this.campaignId, this.donationFrom.value).subscribe(
      (result: any)=>{
        this.loading = false;
        if (result.status === "success"){

          this.toast.success("payment successfully initialized")
          this.toast.info("wait a second till you are redirected to the payment page")
          setTimeout(()=>{
            window.location.replace(result.data.checkout_url)
          }, 1500)

        }
      },err=>{
        this.loading = false;
        this.toast.error("payment couldn't be initialized")
      })
  }

}
