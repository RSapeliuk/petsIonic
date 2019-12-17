import {Component, OnInit} from '@angular/core';
import {LoginUserService} from '../../services/login-user.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {error} from 'util';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: User = new User();
    returnedUser: User;
    isError = false;

    constructor(public loginUserService: LoginUserService,
                public authService: AuthService,
                public router: Router,
                public alertController: AlertController) {
    }

    ngOnInit() {
        this.isError = false;
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Помилка',
            subHeader: 'Subtitle',
            message: 'Ім`я користувача чи пароль невірні',
            buttons: ['OK']
        });

        await alert.present();
    }

    login() {
        this.isError = false;
        this.loginUserService.loginUser(this.user).subscribe(response => {
                const token = response.headers.get('Authorization');
                console.log(token);
                localStorage.setItem('token', token);
                if (token != null) {
                    this.authService.getUser().subscribe(value => {
                        this.returnedUser = value;
                        console.log(this.returnedUser);
                        if (this.returnedUser.role === 'ROLE_USER') {
                            this.router.navigate(['home']);
                            // TODO: Fix bug with updating the page and redirecting to main
                        } else {
                            localStorage.clear();
                            this.isError = true;
                        }
                    });
                }
            }, error1 => {
                this.isError = true;
                this.presentAlert();
            }
        );
    }

}
