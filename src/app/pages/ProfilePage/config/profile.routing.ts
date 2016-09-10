import { Routes, RouterModule } from '@angular/router';

import { AppProfileComponent } from '../components/app-profile/app-profile.component';

const appRoutes:Routes = [
    {
        path: 'profile', component: AppProfileComponent
    }
];


export const ProfileRouting =  RouterModule.forRoot(appRoutes, { useHash: true });
