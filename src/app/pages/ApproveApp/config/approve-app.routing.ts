import { Routes, RouterModule } from '@angular/router';

import { ApproveAppComponent } from '../components/approve-app/approve-app.component';

const appRoutes:Routes = [
    {
        path: 'approve-app', component: ApproveAppComponent
    }
];
export const ApproveAppRouting =  RouterModule.forRoot(appRoutes, { useHash: true });