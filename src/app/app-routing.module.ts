/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* ---------- Components ---------- */
import { BaseComponent } from './views/layout/base/base.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

/* ---------- Others ---------- */
import { AuthGuard } from './core/guard/auth.guard';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('./views/pages/providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./views/pages/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'drivers',
        loadChildren: () => import('./views/pages/drivers/drivers.module').then(m => m.DriversModule)
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./views/pages/vehicles/vehicles.module').then(m => m.DriversModule)
      },
      {
        path: 'parcel',
        loadChildren: () => import('./views/pages/parcel/parcel.module').then(m => m.ParcelModule)
      },
      {
        path: 'branchs',
        loadChildren: () => import('./views/pages/branchs/branchs.module').then(m => m.BranchsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./views/pages/stores/stores.module').then(m => m.StoresModule)
      },
      {
        path: 'bank-accounts',
        loadChildren: () => import('./views/pages/bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule)
      },
      {
        path: 'profiles',
        loadChildren: () => import('./views/pages/profiles/profiles.module').then(m => m.ProfilesModule)
      },
      {
        path: 'bills',
        loadChildren: () => import('./views/pages/bills/bills.module').then(m => m.BillsModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    ]
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
