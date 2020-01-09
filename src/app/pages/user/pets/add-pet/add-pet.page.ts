import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {Pet} from '../../../../models/Pet';
import {PetService} from '../../../../services/pet.service';
import {UuidService} from '../../../../services/uuid.service';
import {ImageUploadService} from '../../../../services/image-upload.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-add-pet',
    templateUrl: './add-pet.page.html',
    styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
    pet: Pet = new Pet();
    user: User;
    size: string[] = ['МАЛЕНЬКИЙ', 'СЕРЕДНІЙ', 'ВЕЛИКИЙ'];
    hairLength: string[] = ['КОРОТКА', 'СЕРЕДНЯ', 'ДОВГА'];
    file: File;
    type: string[] = ['КІТ', 'ПЕС', 'ПТАХ'];
    petPreview: string | ArrayBuffer = '';
    name: any;
    selectedType: string;
    @Input() id: number;

    constructor(public petService: PetService,
                public router: Router,
                public imageService: ImageUploadService,
                public uuidService: UuidService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    savePet() {
        this.pet.photo = this.uuidService.randomName(this.name, this.file, this.pet.photo);
        if (this.file != null) {
            this.imageService.uploadPetPhoto(this.file, this.pet.photo).subscribe(value => {
                console.log(value);
            });
        }
        this.petService.savePet(this.pet, this.id).subscribe(value => {
            console.log(value);
            this.router.navigate(['pets']);
            location.reload();
        });
    }


    onPetPhotoUpload(event: any) {
        const image = event.target.files[0];
        this.file = image;
        const reader = new FileReader();
        reader.onload = () => {
            this.petPreview = reader.result;
        };
        reader.readAsDataURL(image);
    }
    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }

}
