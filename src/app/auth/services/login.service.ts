import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/shared/models/login.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario> {

    return this.httpClient.post<Usuario>(
      this.BASE_URL + "/login",
      login,
      this.httpOptions
      );

    // Este trecho será trocado por uma consulta a uma API REST
    /*
    let usu = new Usuario(1, "Leonardo - Func", login.login, login.senha, "FUNC");

    if (login.login == login.senha) {
      if (login.login == "admin") {
        usu = new Usuario(1, "Leonardo - Admin", login.login, login.senha, "ADMIN");
      }
      else if (login.login == "gerente") {
        usu = new Usuario(1, "Leonardo - Gerente", login.login, login.senha, "GERENTE");
      }
      else if (login.login == "dentista") {
        usu = new Usuario(1, "Leonardo - Dentista", login.login, login.senha, "DENTISTA ");
      }
      return of (usu);
    }
    else {
      return of (null);
    }
    */
  }

}

