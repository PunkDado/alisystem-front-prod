import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DentistaService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/dentistas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Dentista[]> {
    return this.httpClient.get<Dentista[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Dentista> {
    return this.httpClient.get<Dentista>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(dentista: Dentista): Observable<Dentista> {
    return this.httpClient.post<Dentista>(this.BASE_URL, JSON.stringify(dentista),this.httpOptions);
  }

  remover(id: number): Observable<Dentista> {
    return this.httpClient.delete<Dentista>(this.BASE_URL + id, this.httpOptions);
  }

  alterar(dentista: Dentista) {
    return this.httpClient.put<Dentista>(
      this.BASE_URL + dentista.id, 
      JSON.stringify(dentista),
      this.httpOptions
      );
  }

}
