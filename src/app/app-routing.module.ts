import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {PageNotFoundComponent} from './shared/not-found/not-found.component';

const routes: Routes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
