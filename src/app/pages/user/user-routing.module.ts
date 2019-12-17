import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserPage} from './user.page';

const routes: Routes = [
    {
        path: '',
        component: UserPage,
        children: [
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: 'pets',
                loadChildren: () => import('./pets/pets.module').then(m => m.PetsPageModule)
            },
            {
                path: 'posts',
                loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
            },
            {path: '', redirectTo: 'profile', pathMatch: 'full'}]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserPageRoutingModule {
}
