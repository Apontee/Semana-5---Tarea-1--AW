import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private estaLogueadoSubject = new BehaviorSubject<boolean>(false);

    // Observable para saber si el usuario está logueado
    public estaLogueado$ = this.estaLogueadoSubject.asObservable();

    private csrfToken: string | null = null;

    constructor(private http: HttpClient) {
        this.verificarSesion().subscribe();
    }

    get estaLogueado(): boolean {
        return this.estaLogueadoSubject.value;
    }

    obtenerToken(): string | null {
        return this.csrfToken;
    }

    obtenerTokenCsrf(): Observable<any> {
        return this.http.get<{ token: string }>(`${this.apiUrl}/csrf/token`, { withCredentials: true }).pipe(
            tap(respuesta => {
                this.csrfToken = respuesta.token;
            })
        );
    }

    iniciarSesion(credenciales: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credenciales, { withCredentials: true }).pipe(
            tap(() => this.estaLogueadoSubject.next(true))
        );
    }

    cerrarSesion(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
            tap(() => {
                this.estaLogueadoSubject.next(false);
                this.csrfToken = null;
            })
        );
    }

    verificarSesion(): Observable<boolean> {
        return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/check-session`, { withCredentials: true }).pipe(
            map(respuesta => {
                this.estaLogueadoSubject.next(respuesta.authenticated);
                return respuesta.authenticated;
            }),
            catchError(() => {
                this.estaLogueadoSubject.next(false);
                return of(false);
            })
        );
    }
}
