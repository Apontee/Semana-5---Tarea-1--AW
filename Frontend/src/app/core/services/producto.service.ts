import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';


@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:5038/api/productos';

    constructor(private http: HttpClient) { }

    obtenerTodos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
    }

    obtenerPorId(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }

    crear(producto: Omit<Producto, 'id'>): Observable<Producto> {
        return this.http.post<Producto>(this.apiUrl, producto);
    }

    actualizar(id: number, producto: Omit<Producto, 'id'>): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, producto);
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
