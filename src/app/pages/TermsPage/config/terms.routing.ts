import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from '../components/terms/terms.component';

const appRoutes: Routes = [
    {
        path: 'terms', component: TermsComponent
    }
];
export const TermsRouting = RouterModule.forChild(appRoutes);