import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProcedimento } from 'src/app/shared/models/tipo-procedimento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProcedimentoService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<TipoProcedimento[]> {
    return this.httpClient.get<TipoProcedimento[]>(this.BASE_URL + "tipos-procedimentos/", this.httpOptions);
  }

  inserir(tipoProcedimento: TipoProcedimento): Observable<TipoProcedimento> {
    return this.httpClient.post<TipoProcedimento>(this.BASE_URL + "tipos-procedimentos/", JSON.stringify(tipoProcedimento),this.httpOptions);
  }

  buscarPorId(id: number): Observable<TipoProcedimento> {
    return this.httpClient.get<TipoProcedimento>(this.BASE_URL + "tipos-procedimentos/" + id, this.httpOptions);
  }

  atualizar(tipoProcedimento: TipoProcedimento): Observable<TipoProcedimento> {
    return this.httpClient.put<TipoProcedimento>(this.BASE_URL + "tipos-procedimentos/" + tipoProcedimento.id, JSON.stringify(tipoProcedimento), this.httpOptions);
  }

  remover(id: number): Observable<TipoProcedimento | undefined> {
    return this.httpClient.delete<TipoProcedimento>(this.BASE_URL + "tipos-procedimentos/" + id, this.httpOptions);
  }
}
