import { Routes, RouterModule } from '@angular/router';

import { AppProfileComponent } from '../components/app-profile/app-profile.component';

const appRoutes:Routes = [
    {
        path: 'profile/:id/:name', component: AppProfileComponent, data : [{name: "Profile"}]
    },
    {
        path: 'profile', component: AppProfileComponent, data : [{name: "About"}]
    }
];


export const ProfileRouting =  RouterModule.forRoot(appRoutes, { useHash: true });
