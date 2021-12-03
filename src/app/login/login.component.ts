import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User = {} as User;
  warning : string = "";
  loading: boolean= false;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(this.user.userName.length == 0 ){
      this.warning = "User name is empty";
    }
    else if(this.user.password.length == 0){
      this.warning = "Password is empty";
    }else{
      this.loading = true;

      this.auth.login(this.user).subscribe((success) => {
        this.loading = false;
        localStorage.setItem("access_token",success.token);

        this.router.navigate(['/newreleases']);
      },
      (err) => {
          this.warning = err.error.message;
          this.loading = false;
      });
    }
  }
}