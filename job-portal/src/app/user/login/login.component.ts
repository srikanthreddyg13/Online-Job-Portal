import { Component, OnInit, Input, Optional, SkipSelf } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/models/user/user.model';
import { HttpService } from 'src/app/service/http/http.service';
import { Observable } from 'rxjs';
import { NavigatorService } from 'src/app/service/navigation/navigator.service';
import { AppDataService } from 'src/app/service/store/app-data.service';
import { TSMap } from 'typescript-map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Form control for data
   */
  @Input() data: TSMap<String,Object>;
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required)
  });

  constructor(private _appDataService: AppDataService, private httpSevice: HttpService, private navigation: NavigatorService, private router: Router) { 
    this.data = this._appDataService.getData();
  }

  ngOnInit() {
    console.log("Login component");
  }

  /**
   * check login of user
   */
  login = () => {
    
    let username: string = (this.loginForm.controls.username.value === undefined || this.loginForm.controls.username.value === '')? null : this.loginForm.controls.username.value;
    let password: string = (this.loginForm.controls.password.value === undefined || this.loginForm.controls.password.value === '')? null : this.loginForm.controls.password.value;
    let user = new User(username,password);
    let observableUser:Observable<any> = this.httpSevice.login(user);
    observableUser.subscribe( (response) => {
      if( response.success ){
          let user = new User(username,null);
          this._appDataService.setMap("user",user);
          this._appDataService.saveData();
      }
      else{
        console.log("failed");
      }
    },() => {},() =>{
      this.data = this._appDataService.getData();
      if(this.data.get('url') === undefined || this.data.get('url') === 'user'){
        this._appDataService.setMap("url","home");
        this._appDataService.saveData();
        this.data = this._appDataService.getData();
      }
      console.log("Successfully "+ this.data.get("url").toString());
      this.router.navigate([this.data.get("url")]);
    });
  }
}
