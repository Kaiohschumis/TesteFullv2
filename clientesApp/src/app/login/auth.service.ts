import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === "admin" && usuario.senha === "admin") {
      this.usuarioAutenticado = true;
      this.router.navigate(["/home"])
    } else {
      this.usuarioAutenticado = false;
    }
  }
}
