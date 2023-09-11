import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import fundTags from "../data/fund-tags"
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent {

  selectedImage: string | undefined;
  campaignForm : FormGroup;
  fundTypes = fundTags;

  tabStatus = {
    categoryTab: true,
    goalTab: false,
    imageTab: false,
    titleAndDiscTab: false,
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this.campaignForm = this.formBuilder.group({
      title: "",
      description:"",
      image:"your image",
      goal:0
    })
  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    console.log(this.selectedImage)
  }

  removeImage(): void {
    this.selectedImage = undefined;
  }

  tagSelect(type: string){
    this.fundTypes.forEach((fund)=>{
      if (fund.type === type){

        fund.selected = !fund.selected;
      }
    })
  }

  createCampaign(){
    let selectedTags:{type:string, description:string, selected:boolean}[] = this.fundTypes.filter((fund)=>fund.selected)
    console.log(selectedTags)
    // this.userService.createCampaign(this.campaignForm.value.title!, this.campaignForm.value.description!, this.campaignForm.value.goal!, this.campaignForm.value.image!, "leul abay")
  }




}
