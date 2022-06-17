import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agenda } from 'src/app/shared/models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/agendas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Agenda[]> {
    return this.httpClient.get<Agenda[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Agenda> {
    return this.httpClient.get<Agenda>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(agenda: Agenda): Observable<Agenda> {
    return this.httpClient.post<Agenda>(this.BASE_URL, JSON.stringify(agenda),this.httpOptions);
  }

  remover(id: number): Observable<Agenda> {
    return this.httpClient.delete<Agenda>(this.BASE_URL + id, this.httpOptions);
  }

  alterar(agenda: Agenda) {
    return this.httpClient.put<Agenda>(
      this.BASE_URL + agenda.id, 
      JSON.stringify(agenda),
      this.httpOptions
      );
  }
}
