import {Component, KeyValueDiffers, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {EditProfile} from "../models/editProfile";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  selectedFile: File | null = null;
  imageUrl: any;

  editProfileForm : FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toast: ToastrService) {
    this.editProfileForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      facebook: ["", [Validators.required]],
      twitter: ["", [Validators.required]],
      instagram: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]],
      bio: ["", [Validators.required]],
    })
  }

  ngOnInit() {
    this.editProfileForm.value.email = this.userService.currentUser.value.email;
    this.editProfileForm.value.firstName = this.userService.currentUser.value.firstName;
    this.editProfileForm.value.lastName = this.userService.currentUser.value.lastName;
    this.editProfileForm.value.phoneNumber = this.userService.currentUser.value.phoneNumber;
    this.editProfileForm.value.bio = this.userService.currentUser.value.bio;
    this.editProfileForm.value.instagram = this.userService.currentUser.value.socialMedia?.Instagram;
    this.editProfileForm.value.twitter = this.userService.currentUser.value.socialMedia?.Twitter;
    this.editProfileForm.value.linkedin = this.userService.currentUser.value.socialMedia?.LinkedIn;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Display the selected image when it's selected.
    this.displaySelectedImage();
    console.log(this.editProfileForm.value)
    console.log(this.userService.currentUser.value)
  }

  displaySelectedImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event) => {
        this.imageUrl = event.target?.result;
      };
    }
  }

  onSubmit(){
    if (this.selectedFile) {
      this.userService.editImage(this.selectedFile).subscribe(
        result =>{
          this.toast.success("image successfully uploaded")
        },error => {
          this.toast.error("error while uploading image")
        }
      )
    }

    this.userService.editProfile(this.editProfileForm.value as EditProfile);
  }

}
