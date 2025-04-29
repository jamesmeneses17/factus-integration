import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // ✅ (Si quieres alertas bonitas)

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire('Error', 'Token inválido recibido', 'error');
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        Swal.fire('Error', 'Error al iniciar sesión. Verifica los datos.', 'error');
      }
    });
  }

  loginComoInvitado() {
    const correoInvitado = 'sandbox@factus.com.co';
    const passwordInvitado = 'sandbox2024%';

    this.loginService.login(correoInvitado, passwordInvitado).subscribe({
      next: (res) => {
        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token);
          Swal.fire('Bienvenido', 'Has ingresado como invitado.', 'success').then(() => {
            this.router.navigate(['/dashboard']);
          });
        } else {
          Swal.fire('Error', 'Token inválido recibido', 'error');
        }
      },
      error: (err) => {
        console.error('Error al iniciar como invitado:', err);
        Swal.fire('Error', 'No fue posible ingresar como invitado.', 'error');
      }
    });
  }
}
