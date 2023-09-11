import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../services/user.service";
import {RegisterUser} from "../models/registerUser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signUpForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(4)]]
    })

  }

  onSubmit(){
    console.log("form object:", this.signUpForm.value)
    this.userService.registerUser(this.signUpForm.value as RegisterUser)
  }

}
