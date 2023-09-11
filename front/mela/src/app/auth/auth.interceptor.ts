import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

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


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.currentUserData.token){
      request = request.clone({
        setHeaders: {
          authorization: `Bearer-token ${this.currentUserData.token}`
        }
      })
    }
    return next.handle(request);
  }
}
