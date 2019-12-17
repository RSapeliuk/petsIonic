import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsPageRoutingModule } from './pets-routing.module';

import { PetsPage } from './pets.page';
import {MatExpansionModule} from '@angular/material';
import {AddPetPage} from './add-pet/add-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsPageRoutingModule,
    MatExpansionModule,
  ],
  declarations: [PetsPage, AddPetPage],
  entryComponents: [AddPetPage]
})
export class PetsPageModule {}
