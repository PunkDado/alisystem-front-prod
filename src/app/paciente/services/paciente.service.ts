import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CondicaoDentePaciente } from 'src/app/shared/models/condicao-dente-paciente.model';
import { DadosConvenioPaciente } from 'src/app/shared/models/dados-convenio-paciente.model';
import { Email } from 'src/app/shared/models/email.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { TelefoneContato } from 'src/app/shared/models/telefone-contato.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.BASE_URL + "pacientes/", this.httpOptions);
  }

  inserir(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.post<Paciente>(this.BASE_URL + "pacientes/", JSON.stringify(paciente),this.httpOptions);
  }

  buscarPorId(id: number): Observable<Paciente> {
    return this.httpClient.get<Paciente>(this.BASE_URL + "pacientes/" + id, this.httpOptions);
  }

  atualizar(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.put<Paciente>(this.BASE_URL + "pacientes/" + paciente.id, JSON.stringify(paciente), this.httpOptions);
  }

  remover(id: number): Observable<Paciente | undefined> {
    return this.httpClient.delete<Paciente>(this.BASE_URL + "pacientes/" + id, this.httpOptions);
  }

  inserirNovoTelefoneContato(telefoneContato: TelefoneContato): Observable<TelefoneContato> {
    return this.httpClient.post<TelefoneContato>(this.BASE_URL + "telefones-contato/", JSON.stringify(telefoneContato),this.httpOptions);
  }

  editarTelefoneContato(telefoneContato: TelefoneContato): Observable<TelefoneContato> {
    return this.httpClient.put<TelefoneContato>(this.BASE_URL + "telefones-contato/" + telefoneContato.id, JSON.stringify(telefoneContato), this.httpOptions);
  }

  inserirNovoEmail(email: Email): Observable<Email> {
    return this.httpClient.post<Email>(this.BASE_URL + "emails/", JSON.stringify(email),this.httpOptions);
  }

  editarEmail(email: Email): Observable<Email> {
    return this.httpClient.put<Email>(this.BASE_URL + "emails/" + email.id, JSON.stringify(email), this.httpOptions);
  }

  inserirNovoDadosConvenioPaciente(dadosConvenioPaciente: DadosConvenioPaciente): Observable<DadosConvenioPaciente> {
    return this.httpClient.post<DadosConvenioPaciente>(this.BASE_URL + "dados-convenio-paciente/", JSON.stringify(dadosConvenioPaciente),this.httpOptions);
  }

  editarDadosConvenioPaciente(dadosConvenioPaciente: DadosConvenioPaciente): Observable<DadosConvenioPaciente> {
    return this.httpClient.put<DadosConvenioPaciente>(this.BASE_URL + "dados-convenio-paciente/" + dadosConvenioPaciente.id, JSON.stringify(dadosConvenioPaciente), this.httpOptions);
  }

  inserirNovoCondicaoDentePaciente(condicaoDentePaciente: CondicaoDentePaciente): Observable<CondicaoDentePaciente> {
    return this.httpClient.post<TelefoneContato>(this.BASE_URL + "telefones-contato/", JSON.stringify(condicaoDentePaciente),this.httpOptions);
  }

  editarCondicaoDentePaciente(condicaoDentePaciente: CondicaoDentePaciente): Observable<CondicaoDentePaciente> {
    return this.httpClient.put<CondicaoDentePaciente>(this.BASE_URL + "telefones-contato/" + condicaoDentePaciente.id, JSON.stringify(condicaoDentePaciente), this.httpOptions);
  }


}
