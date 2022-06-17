import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedimento } from 'src/app/shared/models/procedimento.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Procedimento[]> {
    return this.httpClient.get<Procedimento[]>(this.BASE_URL + "procedimentos/", this.httpOptions);
  }

  inserir(procedimento: Procedimento): Observable<Procedimento> {
    return this.httpClient.post<Procedimento>(this.BASE_URL + "procedimentos/", JSON.stringify(procedimento),this.httpOptions);
  }

  buscarPorId(id: number): Observable<Procedimento> {
    return this.httpClient.get<Procedimento>(this.BASE_URL + "procedimentos/" + id, this.httpOptions);
  }

  atualizar(procedimento: Procedimento): Observable<Procedimento> {
    return this.httpClient.put<Procedimento>(this.BASE_URL + "procedimentos/" + procedimento.id, JSON.stringify(procedimento), this.httpOptions);
  }

  remover(id: number): Observable<Procedimento | undefined> {
    return this.httpClient.delete<Procedimento>(this.BASE_URL + "procedimentos/" + id, this.httpOptions);
  }
}
