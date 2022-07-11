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

      /* ---------- Tablero de Indicadores ---------- */
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },


      /* ---------- Compras ---------- */
      {
        path: 'nationals',
        loadChildren: () => import('./views/pages/nationals/nationals.module').then(m => m.NationalsModule)
      },
      {
        path: 'imported',
        loadChildren: () => import('./views/pages/imported/imported.module').then(m => m.ImportedModule)
      },
      {
        path: 'purchase-consultation',
        loadChildren: () => import('./views/pages/purchase-consultation/purchase-consultation.module').then(m => m.PurchaseConsultationModule)
      },


      /* ---------- Inventarios ---------- */
      {
        path: 'kardex-of-movements',
        loadChildren: () => import('./views/pages/kardex-of-movements/kardex-of-movements.module').then(m => m.KardexOfMovementsModule)
      },
      {
        path: 'inventory-movements',
        loadChildren: () => import('./views/pages/inventory-movements/inventory-movements.module').then(m => m.InventoryMovementsModule)
      },


      /* ---------- Recibos ---------- */
      {
        path: 'trips-to-receive',
        loadChildren: () => import('./views/pages/trips-to-receive/trips-to-receive.module').then(m => m.TripsToReceiveModule)
      },


      /* ---------- Venta ---------- */
      {
        path: 'product-delivery-ticket',
        loadChildren: () => import('./views/pages/product-delivery-ticket/product-delivery-ticket.module').then(m => m.ProductDeliveryTicketModule)
      },


      /* ---------- Cobranza ---------- */
      {
        path: 'accounts-receivable',
        loadChildren: () => import('./views/pages/accounts-receivable/accounts-receivable.module').then(m => m.AccountsReceivableModule)
      },

      
      /* ---------- Control de Flujos ---------- */
      {
        path: 'expense-record',
        loadChildren: () => import('./views/pages/expense-record/expense-record.module').then(m => m.ExpenseRecordModule)
      },
      {
        path: 'query-movements',
        loadChildren: () => import('./views/pages/query-movements/query-movements.module').then(m => m.QueryMovementsModule)
      },


      /* ---------- Configurarción General ---------- */
      {
        path: 'profiles',
        loadChildren: () => import('./views/pages/profiles/profiles.module').then(m => m.ProfilesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./views/pages/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('./views/pages/providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'business',
        loadChildren: () => import('./views/pages/business/business.module').then(m => m.BusinessModule)
      },
      {
        path: 'branchs',
        loadChildren: () => import('./views/pages/branchs/branchs.module').then(m => m.BranchsModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./views/pages/stores/stores.module').then(m => m.StoresModule)
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
        path: 'bills',
        loadChildren: () => import('./views/pages/bills/bills.module').then(m => m.BillsModule)
      },     
      {
        path: 'bank-accounts',
        loadChildren: () => import('./views/pages/bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule)
      },
      {
        path: 'privileges',
        loadChildren: () => import('./views/pages/privileges/privileges.module').then(m => m.PrivilegesModule)
      },
      {
        path: 'email',
        loadChildren: () => import('./views/pages/email/email.module').then(m => m.EmailModule)
      },
      
      /* ----------  ---------- */
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
