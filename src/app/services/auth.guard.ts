import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  auth = {
    auth: false,
  };
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let authKey = JSON.parse(localStorage.getItem('auth') || '{}');
    if (authKey.auth === true) {
      localStorage.setItem('auth', JSON.stringify(this.auth));
      console.log(authKey.auth);
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
