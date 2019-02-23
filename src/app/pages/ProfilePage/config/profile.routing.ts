import { Routes, RouterModule } from '@angular/router';

import { AppProfileComponent } from '../components/app-profile/app-profile.component';

const appRoutes:Routes = [
    {
        path: 'apps/:id/:name', component: AppProfileComponent, data : [{name: "Profile"}]
    },
    {
        path: 'about', component: AppProfileComponent, data : [{name: "About"}]
    }
];


export const ProfileRouting =  RouterModule.forChild(appRoutes);
