import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginService } from './pages/login/login.service';
import { userSelector, ApplicationState } from './reducers/login-page.reducer';
import * as action from './actions/login-page.actions';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tournament-masterpiece';
  constructor(private readonly store: Store, private localStorageService:LocalStorageService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.checkToken().subscribe((result)=>{
      if(result){
          this.store.dispatch(action.login({
            currentUser: this.loginService.getUserFromToken(this.localStorageService.getToken())
          }));
      }
      else{
        console.log("token expired")
        this.loginService.clearToken();
      }
    },
    (err)=>{
      console.log("token expired")
      this.loginService.clearToken();
    });
  }
}
