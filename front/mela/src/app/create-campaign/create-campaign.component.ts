import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import fundTags from "../data/fund-tags"
import {FundTag} from "../models/fundTag";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Editor} from "ngx-editor";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit, OnDestroy{

  selectedImage: string | null = null;
  selectedImageFile?: File;
  campaignForm : FormGroup;
  fundTypes = fundTags;

  editor: Editor = new Editor();

  tabStatus = {
    categoryTab: true,
    goalTab: false,
    imageTab: false,
    titleAndDiscTab: false,
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toast: ToastrService) {

    this.campaignForm = this.formBuilder.group({
      title: "",
      description:"",
      goal:0
    })
  }

  ngOnInit() {
    this.editor = new Editor();
  }

  ngOnDestroy() {
    this.editor.destroy()
  }


  onFileSelected(event: any): void {

    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
  }

  tagSelect(type: string){
    this.fundTypes.forEach((fund)=>{
      if (fund.type === type){

        fund.selected = !fund.selected;
      }
    })
  }

  onSubmit(){

    let selectedTags: FundTag[] = this.fundTypes.filter((fund)=>fund.selected);
    this.userService.createCampaign(this.campaignForm.value, this.selectedImageFile!, selectedTags);

  }

}
