import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  user:User = new User();
  userId : string = "";

  constructor(private router: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    this.router.params.subscribe(
      (params)=>{

        this.userId = params["user-id"]

        this.userService.getUserById(this.userId).subscribe(
          (result)=>{
            this.user = result.data;
            console.log(this.user)
          }
        )
      }
    )
  }


}
