import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductoListComponent } from './features/productos/producto-list/producto-list.component';
import { ProductoFormComponent } from './features/productos/producto-form/producto-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'productos', component: ProductoListComponent, canActivate: [authGuard] },
    { path: 'productos/nuevo', component: ProductoFormComponent, canActivate: [authGuard] },
    { path: 'productos/editar/:id', component: ProductoFormComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
