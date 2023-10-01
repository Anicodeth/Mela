import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import fundTags from "../data/fund-tags"
import {FundTag} from "../models/fundTag";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Editor} from "ngx-editor";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
  loading : boolean = false;

  editor: Editor = new Editor();

  tabStatus = {
    categoryTab: true,
    goalTab: false,
    imageTab: false,
    titleAndDiscTab: false,
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toast: ToastrService, private router: Router) {

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
    this.loading = true;

    let selectedTags: FundTag[] = this.fundTypes.filter((fund)=>fund.selected);

    if (this.campaignForm.invalid || selectedTags.length == 0 || !this.selectedImageFile){
      this.toast.error("place provide all the requested data")
      this.loading = false;
      return
    }

    this.userService.createCampaign(this.campaignForm.value, this.selectedImageFile!, selectedTags).subscribe(
      (res)=>{

        this.toast.success("campaign created successfully")
        this.loading = false;

        this.router.navigateByUrl(`/campaign/${res.data._id}`)

      },(error)=>{

        this.toast.error("Couldn't create Campaign")
        this.loading = false;
      }
    );

  }

}
