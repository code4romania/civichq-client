import { Routes, RouterModule } from '@angular/router';

import { ApproveAppComponent } from '../components/approve-app/approve-app.component';
import { LoggedInGuard } from './../../../services/login-guard';

const appRoutes:Routes = [
    {
        path: 'approve-app', component: ApproveAppComponent,canActivate: [LoggedInGuard]
    }
];
export const ApproveAppRouting =  RouterModule.forChild(appRoutes);