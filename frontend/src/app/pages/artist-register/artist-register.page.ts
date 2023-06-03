import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist-register',
  templateUrl: './artist-register.page.html',
  styleUrls: ['./artist-register.page.scss'],
})
export class ArtistRegisterPage implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      name: new FormControl(null, {
        updateOn: 'blur'
      }),
      email: new FormControl(null, {
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  onRegister() {
    this.isLoading = true;
    this.authService.registerArtist(this.form.value.name, this.form.value.email, this.form.value.password);

    this.loadingCtrl.create({

      keyboardClose: true,
      message: 'Registering...'
    }).then(loadingEl => {

      loadingEl.present();
      setTimeout(() => {

        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl("/login");
      }, 1000)
    });
    this.form.reset();
  }
}
