import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UuidService} from '../../services/uuid.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {RegisterUserService} from '../../services/register-user.service';
import {LoginUserService} from '../../services/login-user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
    user: User = new User();
    file: File;
    imagePreview: string | ArrayBuffer;
    avatar: any;
    returnedUser: User;

    constructor(public uuidService: UuidService,
                public imageService: ImageUploadService,
                public registerUserService: RegisterUserService,
                public loginService: LoginUserService,
                public router: Router) {
    }

    ngOnInit() {
    }

    sendForm() {

        this.user.avatar = this.uuidService.randomName(this.avatar, this.file, this.user.avatar);

        if (this.file != null) {
            this.imageService.uploadUserAvatar(this.file, this.user.avatar).subscribe(value => {
                console.log(value);
            });
        }
        this.registerUserService.saveUser(this.user).subscribe(value => {
            console.log(value);
            this.router.navigateByUrl('/');
            this.returnedUser = value;
        });

        setTimeout(() => {
            this.loginService.loginUser(this.user).subscribe(response => {
                const token = response.headers.get('Authorization');
                console.log(token);
                localStorage.setItem('token', token);
                location.reload();
            });
        }, 1000);

    }

    onPhotoUpload(event: any) {
        const image = event.target.files[0];
        this.file = image;

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(image);
    }
}
