import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any = {};
  errorMsg: string = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log('Here object', this.user);
    this.userService.login(this.user).subscribe((data) => {
      if (data.msg == 'Welcome') {
        sessionStorage.setItem('jwt', data.user);
        let decoded: any = jwtDecode(data.user);
        if (decoded.role == 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.errorMsg = 'Please check your Email/pwd';
      }
    });
  }
}
