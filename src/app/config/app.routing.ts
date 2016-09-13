import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppProfileComponent} from '../pages/ProfilePage/components/app-profile/app-profile.component';
import {HomeComponent} from '../pages/HomePage/components/home/home.component';

const appRoutes:Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];


export const AppRouting =  RouterModule.forRoot(appRoutes, { useHash: true });
