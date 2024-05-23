import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // Form ID
  signupForm!: FormGroup;
  path!: string;
  title!: string;
  imagePreview: any;
  constructor(
    private fBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.path = this.router.url;
    // if (this.path == '/inscription') {
    //   this.title = 'Signup Client';
    // } else {
    //   this.title = 'Signup Admin';
    // }
    this.title = this.path == '/inscription' ? 'Signup Client' : 'Signup Admin';
    console.log('Here into signup', this.path);
    this.signupForm = this.fBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.required,
        ],
      ],
      tel: [''],
    });
  }

  // Methode
  signup() {
    let user = this.signupForm.value;
    if (this.path == '/inscription') {
      user.role = 'client';
    } else {
      user.role = 'admin';
    }
    console.log('Here user', user);
    this.userService.signup(user,this.signupForm.value.img).subscribe((response) => {
      console.log('Here response after signup', response.msg);
    });


  }


  onImageSelected(event: Event) {
   
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ img: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
