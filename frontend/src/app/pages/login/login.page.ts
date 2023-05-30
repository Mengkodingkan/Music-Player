import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      email: new FormControl(null, {
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        updateOn: 'blur'
      })
    })
  }

  login() {

  }
}
