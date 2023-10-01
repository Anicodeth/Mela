import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../services/campaign.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Campaign} from "../models/campaign";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-campaigns-page',
  templateUrl: './all-campaigns-page.component.html',
  styleUrls: ['./all-campaigns-page.component.css']
})
export class AllCampaignsPageComponent implements OnInit{

  campaigns:Campaign[] = [];
  searchForm : FormGroup;
  loading:boolean= false;

  constructor(private campaignService: CampaignService, private fb: FormBuilder, private toast: ToastrService) {
    this.searchForm = this.fb.group({
      search: ["", Validators.required]
    })
  }

  ngOnInit() {

    this.loading = true
    this.campaignService.searchCampignsByTitle(this.searchForm.value.search).subscribe(
      (result)=>{
        this.campaigns = result.data;
        this.loading = false
      },
      error => {
        this.toast.error("could not search for the moment")
        this.loading = false
      }
    )
  }

  onSubmit(){

    this.loading = true;
    this.campaignService.searchCampignsByTitle(this.searchForm.value.search).subscribe(
      (result)=>{

         this.campaigns = result.data;
         this.loading = false;
      },
      error => {
        this.toast.error("could not search for the moment")
        this.loading = false
        return []
      }
    )
  }

}
