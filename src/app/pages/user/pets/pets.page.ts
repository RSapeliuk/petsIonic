import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Post} from '../../../models/Post';
import {Pet} from '../../../models/Pet';
import {PetService} from '../../../services/pet.service';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {ImageUploadService} from '../../../services/image-upload.service';
import {ModalController} from '@ionic/angular';
import {AddPetPage} from './add-pet/add-pet.page';

@Component({
    selector: 'app-pets',
    templateUrl: './pets.page.html',
    styleUrls: ['./pets.page.scss'],
})
export class PetsPage implements OnInit {
    user: User;
    userPets: Pet[];
    editable = false;
    size: string[] = ['МАЛЕНЬКИЙ', 'СЕРЕДНІЙ', 'ВЕЛИКИЙ'];
    hairLength: string[] = ['КОРОТКА', 'СЕРЕДНЯ', 'ДОВГА'];
    pet: Pet;
    file: File;

    constructor(public authUser: AuthService,
                public petService: PetService,
                public modalController: ModalController) {
    }

    ngOnInit() {
        this.authUser.getUser().subscribe(value => {
            console.log(value);
            this.user = value;
        });
        setTimeout(() => {
            this.petService.getPets(this.user).subscribe(value => this.userPets = value);
        }, 500);    }

    cancelEdit() {
        this.editable = false;
    }

    editUser() {
        this.editable = true;
    }

    updatePet() {
        this.petService.updatePet(this.pet).subscribe(value => console.log(value));
    }

    getOnePet(id) {
        this.petService.getOnePet(id).subscribe(value => {
            this.pet = value;
            console.log(value);
        });
    }
    async onClick() {
        const modal = await this.modalController.create({
            component: AddPetPage,
            componentProps: {
                id: this.user.id,
            }
        });
        return await modal.present();
    }
}
