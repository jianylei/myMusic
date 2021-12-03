import { Component, OnInit } from '@angular/core';
import RegisterUser from '../RegisterUser';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser : RegisterUser = {} as RegisterUser;
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm){
    if(this.registerUser.userName.length == 0 ){
     this.warning = "User name is empty";
    }
    else if(this.registerUser.password.normalize() !== this.registerUser.password2.normalize()){
      this.warning = "Password does not match"
    }else{
    this.loading = true;
    this.auth.register(this.registerUser).subscribe(() => {
      this.success = true;
      this.warning = "";
      this.loading = false;
    },
    (err) => {
      this.success = false;
        this.warning = err.error.message;
        this.loading = false;
    });
    }
}}
