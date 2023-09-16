import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import { User} from "../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentUserData :User = this.userService.currentUser.value;

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe((data)=>{
      this.currentUserData = data;
    })
  }

  onSignOut(){
    this.userService.signOut()
  }
}
