import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    user: User;

    constructor(private menu: MenuController,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        if(!this.user) {
            this.authService.getUser().subscribe(value => this.user = value);
        }
    }
    logout() {
        this.authService.logout();
        window.location.reload();
    }



}
