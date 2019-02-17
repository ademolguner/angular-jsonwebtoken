import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,
  FormGroup,
  Validators,} from '@angular/forms';
import { LoginUser } from '../models/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  loginForm: FormGroup; 
  loginUser: any = {}
ngOnInit() { 
  this.createLoginForm()
}

createLoginForm(){
  this.loginForm = this.formBuilder.group(
    {
      userName:['', Validators.required],
      password:['',[Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)]]
    }
  )
}


login(loginUser: LoginUser) {
   if(this.loginForm.valid){
     this.authService.login(loginUser);
   }
}

 

}
