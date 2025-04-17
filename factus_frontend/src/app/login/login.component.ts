import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


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
        console.log('Login exitoso:', res);
        localStorage.setItem('access_token', res.access_token); // ✅ Guarda el token
        this.router.navigate(['/dashboard']); // ✅ Redirige
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      }
    });
    
  }
}
