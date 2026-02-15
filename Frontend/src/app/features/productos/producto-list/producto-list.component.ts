import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Productos</h2>
        <a routerLink="/productos/nuevo" class="btn btn-primary">
          <i class="bi bi-plus-lg"></i> Nuevo Producto
        </a>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped table-hover shadow-sm rounded">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let producto of productos">
              <td>{{ producto.id }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.precio | currency }}</td>
              <td>{{ producto.stock }}</td>
              <td>
                <a [routerLink]="['/productos/editar', producto.id]" class="btn btn-outline-primary btn-sm me-2" title="Editar">
                  <i class="bi bi-pencil-fill"></i>
                </a>
                <button (click)="eliminar(producto.id)" class="btn btn-outline-danger btn-sm" title="Eliminar">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
            <tr *ngIf="productos.length === 0">
              <td colspan="5" class="text-center">No hay productos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerTodos().subscribe(data => {
      this.productos = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}
