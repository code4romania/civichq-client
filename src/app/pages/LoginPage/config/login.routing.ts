import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';

const appRoutes:Routes = [
    {
        path: 'login', component: LoginComponent
    }
];
export const LoginRouting =  RouterModule.forRoot(appRoutes, { useHash: true });