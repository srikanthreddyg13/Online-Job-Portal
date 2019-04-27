import { Injectable, Output, EventEmitter } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AppDataService} from '../store/app-data.service';
import { NavigatorService } from '../navigation/navigator.service';
import { User } from 'src/app/models/user/user.model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

/**
 * AuthGuard for routes
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild{
  
  user: User;
  flag:boolean;
  
  constructor(private router:NavigatorService, private _appDataService: AppDataService){
   
  }
/**
 * 
 * Check login information before routing to a component
 */
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.canActivateChild(next,state)){
        return true;
      }
      else{
        this.router.navigate('user');
        return false;
      }
  }
  /**
   *  Check login information before routing to a component
   */
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    return this.checkLogin(state.url);
  }

  /**
   * checklogin - check wether user exist in session and navigate based on it
   */
  checkLogin(url: string): boolean {
      
    if(url === '/logout'){
      let user = new User(null,null);
      this._appDataService.clearData("user",user);
      this._appDataService.clearData("url","home");
      //this.router.navigate('home');
      this.flag = true;
    }
    let data = this._appDataService.getData();
    if(data.get('user') === undefined){
      console.log("user undefined");
      //this.router.navigate('user');
      this.flag = false;
    }
    else{
      let usr: User = Object.assign(data.get('user'));
      if(usr.email != null){
        console.log("success");
        this.flag = true;
      }
      else{
        console.log("email not found");
        this.flag = false;
      }
    }
    this._appDataService.setMap('url',url);
    this._appDataService.saveData();
    console.log("Flag:" + this.flag);
    return this.flag;
  }
}
