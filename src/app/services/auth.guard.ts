import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FbServiceService } from './fb-service.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public fbService: FbServiceService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var sonuc: boolean = false;
    if (this.fbService.isLogin()) {
      sonuc = true;
    } else {
      location.href = "/login";
    }
    return sonuc;
  }

}
