import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';

const LS_CHAVE: string = 'atendimentos';
const LS_CHAVE_2: string = 'procedimentosAplicados';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  BASE_URL = "https://alisystem-tcc-api.herokuapp.com/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Atendimento[]> {
    return this.httpClient.get<Atendimento[]>(this.BASE_URL + "atendimentos/", this.httpOptions);
  }

  inserir(atendimento: Atendimento): Observable<Atendimento> {
    return this.httpClient.post<Atendimento>(this.BASE_URL + "atendimentos/", JSON.stringify(atendimento),this.httpOptions);
  }

  buscarPorId(id: number): Observable<Atendimento> {
    return this.httpClient.get<Atendimento>(this.BASE_URL + "atendimentos/" + id, this.httpOptions);
  }

  atualizar(atendimento: Atendimento): Observable<Atendimento> {
    return this.httpClient.put<Atendimento>(this.BASE_URL + "atendimentos/" + atendimento.id, JSON.stringify(atendimento), this.httpOptions);
  }

  remover(id: number): Observable<Atendimento | undefined> {
    return this.httpClient.delete<Atendimento>(this.BASE_URL + "atendimentos/" + id, this.httpOptions);
  }

  inserirNovoProcedimentoAplicado(procedimentoAplicado: ProcedimentoAplicado): Observable<ProcedimentoAplicado> {
    return this.httpClient.post<ProcedimentoAplicado>(this.BASE_URL + "procedimentos-aplicados/", JSON.stringify(procedimentoAplicado),this.httpOptions);
  }

  editarProcedimentoAplicado(procedimentoAplicado: ProcedimentoAplicado): Observable<ProcedimentoAplicado> {
    return this.httpClient.put<ProcedimentoAplicado>(this.BASE_URL + "procedimentos-aplicados/" + procedimentoAplicado.id, JSON.stringify(procedimentoAplicado), this.httpOptions);
  }

  listarAtendimentosPorPaciente(paciente: Paciente): Observable<Atendimento[]> {
    return this.httpClient.get<Atendimento[]>(this.BASE_URL + "atendimentos/paciente/" + paciente.id, this.httpOptions);
  }

}

/*

export class PedidoService {

  BASE_URL = "https://pedido-produtos-api.herokuapp.com/pedidos/";
  //BASE_URL = "http://localhost:8080/pedidos/";
  // Esta acima é a URL para usar uma API rodando localmente

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodosOsPedidos(): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.BASE_URL, this.httpOptions);
  }

  inserirNovoPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.BASE_URL, JSON.stringify(pedido),this.httpOptions);
  }

  listarItensDoPedidoPorPedido(pedido: Pedido): Observable<ItemDoPedido[]> {
    return this.httpClient.get<ItemDoPedido[]>(this.BASE_URL + "itens-do-pedido/pedido/" + pedido.id, this.httpOptions);
  }

  inserirNovoItemDoPedido(itemDoPedido: ItemDoPedido): Observable<ItemDoPedido> {
    return this.httpClient.post<ItemDoPedido>(this.BASE_URL, JSON.stringify(itemDoPedido),this.httpOptions);
  }

  listarPedidosPorCliente(id: number): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.BASE_URL + "cliente/" + id , this.httpOptions);
  }

}

//Código para armazenamento local

listarTodos(): Atendimento[] {
    const atendimentos = localStorage[LS_CHAVE];
    return atendimentos ? JSON.parse(atendimentos) : [];
  }

  inserir(atendimento: Atendimento) {
    const atendimentos = this.listarTodos();
    atendimento.id = new Date().getTime();
    atendimentos.push(atendimento);
    localStorage[LS_CHAVE] = JSON.stringify(atendimentos);
  }

  buscarPorId(id: number): Atendimento | undefined {
    const atendimentos: Atendimento[] = this.listarTodos();
    return atendimentos.find(atendimento => atendimento.id === id);
  }

  atualizar(atendimento: Atendimento): void {
    const atendimentos: Atendimento[] = this.listarTodos();
    atendimentos.forEach( (obj, index, objs) => {
      if(atendimento.id == obj.id) {
        objs[index] = atendimento;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(atendimentos);
  }

  remover(id: number): void {
    let atendimentos = this.listarTodos();
    atendimentos = atendimentos.filter(atendimento => atendimento.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(atendimentos);
  }

  listarProcedimentosAplicados(): ProcedimentoAplicado[] {
    const procedimentosAplicados = localStorage[LS_CHAVE_2];
    return procedimentosAplicados ? JSON.parse(procedimentosAplicados) : [];
  }

  listarProcedimentosAplicadosPorAtendimento(atendimento: Atendimento): ProcedimentoAplicado[] {
    return atendimento.procedimentosAplicados!;
  }

  inserirNovoProcedimentoAplicado(procedimentoAplicado: ProcedimentoAplicado): void {
    const procedimentosAplicados: ProcedimentoAplicado[] = this.listarProcedimentosAplicados();
    procedimentoAplicado.id = new Date().getTime();
    procedimentosAplicados.push(procedimentoAplicado);
    localStorage[LS_CHAVE_2] = JSON.stringify(procedimentosAplicados);
  }

  atualizarProcedimentoAplicado(procedimentoAplicado: ProcedimentoAplicado): void {
    const procedimentosAplicados = this.listarProcedimentosAplicados();
    procedimentosAplicados.forEach( (obj, index, objs) => {
      if(procedimentoAplicado.id == obj.id) {
        objs[index] = procedimentoAplicado;
      }
    });
  }

  removerProcedimentoAplicado(id: number): void {
    let procedimentosAplicados = this.listarProcedimentosAplicados();
    procedimentosAplicados = procedimentosAplicados.filter(
      procedimentoAplicado => procedimentoAplicado.id !== id
      );
    localStorage[LS_CHAVE_2] = JSON.stringify(procedimentosAplicados);
  }
*/