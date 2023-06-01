import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isLoading = false;
  data: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    const role = localStorage.getItem('role');
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl(`/${role}/tabs/${role == 'user' ? 'home' : 'dashboard'}`);
    }
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      email: new FormControl(null, {
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  onLogin() {
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password);
    this.authService.data.subscribe(data => this.data = data);

    this.loadingCtrl.create({

      keyboardClose: true,
      message: 'Logging in...'
    }).then(loadingEl => {

      loadingEl.present();
      setTimeout(() => {

        this.isLoading = false;
        loadingEl.dismiss();

        switch (this.data.role) {
          case 'user':
            this.router.navigateByUrl('/user/tabs/home');
            break;
          case 'artist':
            this.router.navigateByUrl('/artist/tabs/dashboard');
            break;
          case 'admin':
            this.router.navigateByUrl('/admin/tabs/dashboard');
            break;
        }

        if (this.data.statusCode != 200) {

          this.toastCtrl.create({
            message: 'Username or password is incorrect',
            duration: 2000,
            color: 'danger'
          }).then(toastEl => {
            toastEl.present();
          });
          return;
        }
        localStorage.setItem('token', this.data.token);
        localStorage.setItem('id', this.data.id);
        localStorage.setItem('role', this.data.role);
        this.form.reset()
      }, 1500);
    });
  }
}
