import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPagePage} from './main-page.page';
import {PostDetailsPage} from './post-details/post-details.page';

const routes: Routes = [
    {
        path: '',
        component: MainPagePage
    },
    {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'registration',
        loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationPageModule)
    },
    {
        path: 'post',
        loadChildren: () => import('../post/post.module').then(m => m.PostPageModule)
    },
    {
        path: 'post-details',
        loadChildren: () => import('./post-details/post-details.module').then(m => m.PostDetailsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPagePageRoutingModule {
}
