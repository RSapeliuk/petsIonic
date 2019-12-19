import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPagePageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import {MenuComponent} from '../../components/menu/menu.component';
import {PostDetailsPage} from './post-details/post-details.page';
import {RatingModule} from 'ng-starrating';
import {StarRating, StarRatingModule} from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule,
    StarRatingModule.forRoot(),
  ],
  exports: [StarRatingModule],
  declarations: [MainPagePage, MenuComponent, PostDetailsPage],
  entryComponents: [PostDetailsPage],
  providers: [PostDetailsPage]
})
export class MainPagePageModule {}
