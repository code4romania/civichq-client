import { Routes, RouterModule } from '@angular/router';

import { AddAppComponent } from '../components/add-app/add-app.component';

const appRoutes:Routes = [
    {
        path: 'add-app', component: AddAppComponent
    }
];
export const AddAppRouting =  RouterModule.forRoot(appRoutes, { useHash: true });