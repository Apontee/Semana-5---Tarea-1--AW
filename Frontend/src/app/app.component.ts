import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/productos">Gestión Productos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos" routerLinkActive="active">Productos</a>
            </li>
          </ul>
          <div class="d-flex" *ngIf="authService.estaLogueado$ | async">
            <button class="btn btn-outline-light" (click)="cerrarSesion()">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);

  cerrarSesion() {
    this.authService.cerrarSesion().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
