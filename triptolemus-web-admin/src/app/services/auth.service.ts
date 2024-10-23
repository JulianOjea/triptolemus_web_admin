import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): Observable<boolean> {
    // Simulación de una llamada API
    return of(username === 'admin' && password === '123456').pipe(
      
    );
  }
}
