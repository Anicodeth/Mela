import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUserData: User;

  constructor(private userService: UserService) {
    // Initialize currentUserData with the initial value
    this.currentUserData = userService.currentUser.value;

    // Subscribe to changes in the currentUser property
    userService.currentUser.subscribe((user) => {
      // Update currentUserData when the currentUser changes
      this.currentUserData = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return !!this.currentUserData.token;

  }

}
