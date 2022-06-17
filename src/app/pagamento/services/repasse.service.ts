import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repasse } from 'src/app/shared/models/repasse.model';

@Injectable({
  providedIn: 'root'
})
export class RepasseService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Repasse[]> {
    return this.httpClient.get<Repasse[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Repasse> {
    return this.httpClient.get<Repasse>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(repasse: Repasse): Observable<Repasse> {
    return this.httpClient.post<Repasse>(this.BASE_URL, JSON.stringify(repasse),this.httpOptions);
  }

  remover(id: number): Observable<Repasse> {
    return this.httpClient.delete<Repasse>(this.BASE_URL + id, this.httpOptions);
  }

  alterar(repasse: Repasse) {
    return this.httpClient.put<Repasse>(
      this.BASE_URL + repasse.id, 
      JSON.stringify(repasse),
      this.httpOptions
      );
  }
  
}
