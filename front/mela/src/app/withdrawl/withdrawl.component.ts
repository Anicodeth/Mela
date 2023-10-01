import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";
import {Bank} from "../models/bank";
import {User} from "../models/user";

@Component({
  selector: 'app-withdrawl',
  templateUrl: './withdrawl.component.html',
  styleUrls: ['./withdrawl.component.css']
})
export class WithdrawlComponent implements OnInit{

  loading: boolean = false;
  intailLoading: boolean = false;
  transfer: FormGroup;
  banks: Bank[] = [];
  currentUserData:User;

  constructor(private fb: FormBuilder, private userService: UserService, private toast: ToastrService) {
    this.transfer = this.fb.group({
      bank_code: ["", Validators.required],
      amount: [0, Validators.required],
      account_name: ["", Validators.required],
      account_number: ["", Validators.required]
    })

    this.currentUserData = userService.currentUser.value;
  }

  ngOnInit() {
    this.intailLoading = true
    this.userService.getBanks().subscribe(
      (res: any)=>{
        this.banks = res.data
        this.intailLoading = false
      },(err)=>{
        this.toast.error("error on loading data")
        this.intailLoading = false
    }
    )
    this.userService.getUserById(this.currentUserData._id).subscribe(
      res=>{
        this.currentUserData = res.data;
      },error => {
        console.log(error)
      }
    )
  }

  onSubmit(){

    this.loading = true
    console.log(this.transfer.value)
    this.userService.withdrawal(this.transfer.value).subscribe(
      res=>{
        this.toast.success("withDrawl successful")
        this.loading = false
      },err =>{
        console.log(err)
        this.toast.error("error on withdrawal")
        this.loading = false
      }
    )
  }

}
