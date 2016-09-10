import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppProfileComponent} from './pages/ProfilePage/components/app-profile/app-profile.component';
import {HomeComponent} from './pages/HomePage/components/home/home.component';

const appRoutes:Routes = [
    {
        path: 'app-profile', component: AppProfileComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];


export const routing =  RouterModule.forRoot(appRoutes);
