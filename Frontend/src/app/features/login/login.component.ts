import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div class="card shadow-lg" style="width: 400px;">
        <div class="card-header bg-primary text-white text-center py-3">
          <h4 class="mb-0">Iniciar Sesión</h4>
        </div>
        <div class="card-body p-4">
          <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ errorMessage }}
            <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
                <input type="email" id="email" formControlName="email" class="form-control" placeholder="admin@prueba.com" 
                  [class.is-invalid]="f['email'].invalid && (f['email'].dirty || f['email'].touched)">
              </div>
              <div *ngIf="f['email'].invalid && (f['email'].dirty || f['email'].touched)" class="invalid-feedback d-block">
                Correo inválido.
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                <input type="password" id="password" formControlName="password" class="form-control" placeholder="******"
                  [class.is-invalid]="f['password'].invalid && (f['password'].dirty || f['password'].touched)">
              </div>
              <div *ngIf="f['password'].invalid && (f['password'].dirty || f['password'].touched)" class="invalid-feedback d-block">
                Contraseña requerida.
              </div>
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-primary btn-lg" [disabled]="loginForm.invalid || isLoading">
                <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
              </button>
            </div>
          </form>
        </div>
        <div class="card-footer text-center text-muted py-3">
          <small>&copy; 2024 Mi Sistema</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .min-vh-100 { min-height: 100vh; }
    .bg-light { background-color: #f8f9fa !important; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Primero obtenemos el token de seguridad
    this.authService.obtenerTokenCsrf().subscribe({
      next: () => {
        // Luego iniciamos sesión
        this.authService.iniciarSesion(this.loginForm.value).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/productos']);
          },
          error: (err: any) => {
            this.isLoading = false;
            if (err.status === 401) {
              this.errorMessage = 'Credenciales Incorrectas';
            } else {
              this.errorMessage = 'Error en el servidor. Intenta de nuevo.';
            }
          }
        });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error de conexión (CSRF).';
      }
    });
  }
}
