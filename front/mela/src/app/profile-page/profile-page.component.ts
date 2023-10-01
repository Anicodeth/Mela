import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  user:User = new User();
  userId : string = "";
  Loading: boolean = false;

  constructor(private router: ActivatedRoute, private userService: UserService, private toast: ToastrService) {

  }

  ngOnInit() {
    this.Loading = true;
    this.router.params.subscribe(
      (params)=>{

        this.userId = params["user-id"]

        this.userService.getUserById(this.userId).subscribe(
          (result)=>{
            this.Loading = false;
            this.user = result.data;
            console.log(this.user)
          },error => {
            this.Loading = false;
            this.toast.error("Error while loading user's data")
          }
        )
      }
    )
  }


}
