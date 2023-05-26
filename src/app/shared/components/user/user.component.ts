import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  logincad: string = '';
  senhacad: string = '';
  login: string = '';
  senha: string = '';

  constructor(private userService: UserService) { }

  cadastrar() {
    if (this.logincad.trim() === '') {
      Swal.fire(`Login não pode estar vazio!`, '', 'error');
      return;
    } else if (this.logincad.length <= 4) {
      Swal.fire(`Login não pode ter menos que 5 caracteres!`, '', 'error');
      return;
    } else if (this.senhacad.trim() === '') {
      Swal.fire(`Senha não pode estar vazia!`, '', 'error');
      return;
    } else if (this.senhacad.length <= 4) {
      Swal.fire(`Senha não pode ter menos que 5 caracteres!`, '', 'error');
      return;
    }

    this.userService.getUsers().subscribe(
      (users: User[]) => {
        const existingUser = users.find(user => user.email === this.logincad);
        if (existingUser) {
          Swal.fire(`Usuário ${this.logincad} já está cadastrado!`, '', 'info');
          return;
        }

        const newUser: User = {
          id: 0,
          name: '',
          email: this.logincad,
          phone: '',
          password: this.senhacad
        };

        this.userService.createUser(newUser).subscribe(
          (createdUser: User) => {
            Swal.fire('CADASTRO REALIZADO COM SUCESSO!', `Bem-vindo: ${createdUser.email}`, 'success');
            this.limpar();
          },
          (error) => {
            console.error('Failed to create user:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  limpar() {
    this.logincad = '';
    this.senhacad = '';
  }

  logar() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        const existingUser = users.find(user => user.email === this.login && user.password === this.senha);
        if (existingUser) {
          const usuarioLogado = { login: this.login };
          const token = Math.random().toString(16).substr(2);
          localStorage.setItem('token', token);
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
          location.href = 'index.html';
        } else {
          Swal.fire('Login inválido', '', 'error');
        }
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  sair() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}
