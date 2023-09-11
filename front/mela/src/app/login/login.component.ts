import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signInForm = fb.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    this.userService.loginUser(this.signInForm.value)
  }

}
