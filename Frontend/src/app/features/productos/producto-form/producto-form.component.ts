import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <h3 class="card-title mb-0">{{ isEditing ? 'Editar' : 'Nuevo' }} Producto</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="productoForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label" for="nombre">Nombre</label>
                  <input type="text" id="nombre" formControlName="nombre" class="form-control" [class.is-invalid]="isInvalid('nombre')">
                  <div class="invalid-feedback text-danger small">El nombre es requerido.</div>
                </div>

                <div class="mb-3">
                  <label class="form-label" for="precio">Precio</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" id="precio" formControlName="precio" class="form-control" [class.is-invalid]="isInvalid('precio')">
                  </div>
                  <div class="invalid-feedback d-block text-danger small" *ngIf="isInvalid('precio')">El precio debe ser mayor a 0.</div>
                </div>

                <div class="mb-3">
                  <label class="form-label" for="stock">Stock</label>
                  <input type="number" id="stock" formControlName="stock" class="form-control" [class.is-invalid]="isInvalid('stock')">
                  <div class="invalid-feedback text-danger small">El stock es requerido y no puede ser negativo.</div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-success btn-lg" [disabled]="productoForm.invalid">
                    <i class="bi bi-check-circle-fill me-2"></i> Guardar
                  </button>
                  <a routerLink="/productos" class="btn btn-secondary btn-lg">
                    <i class="bi bi-x-circle-fill me-2"></i> Cancelar
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  isEditing = false;
  productoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.productoId = +id;
      this.productoService.obtenerPorId(this.productoId).subscribe(p => {
        this.productoForm.patchValue(p);
      });
    }
  }

  isInvalid(field: string) {
    const control = this.productoForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;

      if (this.isEditing && this.productoId) {
        this.productoService.actualizar(this.productoId, producto).subscribe({
          next: () => {
            alert('Producto actualizado correctamente');
            this.router.navigate(['/productos']);
          },
          error: (err: any) => {
            console.error('Error al actualizar:', err);
            alert('Error al actualizar el producto. \n' + (err.error?.error || 'Error desconocido. Verifica la consola.'));
          }
        });
      } else {
        this.productoService.crear(producto).subscribe({
          next: () => {
            alert('Producto creado correctamente');
            this.router.navigate(['/productos']);
          },
          error: (err: any) => {
            console.error('Error al crear:', err);
            alert('Error al crear el producto. \n' + (err.error?.error || 'Error desconocido. Verifica la consola.'));
          }
        });
      }
    }
  }
}
