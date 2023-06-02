import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/cadastrar']);
    }
  }

  login(): void {
    const user: User = {
      id: 0,
      name: '',
      email: this.email,
      phone: '',
      password: this.password
    };
  
    this.userService.loginUser(user).subscribe(
      (response) => {
        var usuarioLogado = this.email;
        let token = Math.random().toString(16).substr(2);
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        console.log('Login bem-sucedido:', response);
        Swal.fire('Sucesso!', 'Login bem-sucedido!', 'success').then(() => {
          this.router.navigate(['/cadastrar']);
        });
      },
      (error) => {
        // Lógica para tratamento de erro no login
        console.error('Erro no login:', error);
        Swal.fire('Erro!', 'Credenciais inválidas.', 'error');
      }
    );
  }

}