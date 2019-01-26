import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from '../components/search/search.component';

const appRoutes:Routes = [
    {
        path: 'search', component: SearchComponent
    }
];
export const SearchRouting =  RouterModule.forChild(appRoutes);