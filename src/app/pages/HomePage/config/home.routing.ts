import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';

const appRoutes:Routes = [
    {
        path: 'home', component: HomeComponent
    }
];


export const HomeRouting =  RouterModule.forChild(appRoutes);
