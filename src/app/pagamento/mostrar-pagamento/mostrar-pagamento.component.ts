import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { Repasse } from 'src/app/shared/models/repasse.model';
import { DownloadService } from '../services/download.service';
import { RepasseService } from '../services/repasse.service';

@Component({
  selector: 'app-mostrar-pagamento',
  templateUrl: './mostrar-pagamento.component.html',
  styleUrls: ['./mostrar-pagamento.component.css']
})
export class MostrarPagamentoComponent implements OnInit {

  @ViewChild('formDentistaDataRepasse') formDentistaDataRepasse!: NgForm;

  dentistas: Dentista[] = [];
  dentistaId!: number;
  dataRepasse!: string;
  dentista!: Dentista;
  atendimentos!: Atendimento[];
  datasRepasse!: string[];
  novaDataDeRepasse!: string;
  
  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService,
    private downloadService: DownloadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarAtendimentos();
    this.listarDentistas();
    this.listarDatasRepasse();
    
  }

  listarAtendimentos(): void {
    this.atendimentoService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.atendimentos = [];
        //this.size = this.atendimentos.length;
      }
      else {
        this.atendimentos = dados;
        //this.size = this.atendimentos.length;
      }
    });
  }

  listarDentistas(): void {
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if (dados == null){
          this.dentistas = []
        }
        else {
          this.dentistas = dados;
        }
      });
  }

  listarDatasRepasse(): void {
    this.repasseService.listarTodos().subscribe(
      (repasses: Repasse[]) => {
        if (repasses == null) {
          this.datasRepasse = [];
        }
        else {
          this.datasRepasse = repasses.map(repasse => repasse.dataRepasse!);
        }
      }
    )  
  }

  repassesDentistas(dentista: Dentista): number[] {
    
    let totalRepassesPorDataRepasse:number[] = [];
    
    let atendimentosDentista: Atendimento[] = [];
    for(let atendimento of this.atendimentos) {
      if(atendimento.dentista?.id == dentista?.id) {
        atendimentosDentista.push(atendimento);
      }
      
    }

    //Para cada data de repasses, calcula o valorRepassado ao dentista
    for(let dataRepasse of this.datasRepasse) {

      let procedimentosAplicadosDentista: ProcedimentoAplicado[] =
        procedimentosAplicadosAtendimentos(atendimentosDentista);

      let procedimentosAplicadosDentistaData: ProcedimentoAplicado[] = 
        procedimentosAplicadosDentista.filter(
          procedimentoAplicadoDentista => procedimentoAplicadoDentista.dataRepasse == dataRepasse
        );
      
      let repasse: number = sumValorRepassado(procedimentosAplicadosDentistaData);

      totalRepassesPorDataRepasse.push(repasse);
    }
    
    return totalRepassesPorDataRepasse;
  }

  listarAtendimentosPorDentistaPorDataRepasse(dentistaId: number, dataRepasse: string): Atendimento[] {
    let atendimentosFiltrados: Atendimento[];
    if ((dentistaId == null || dentistaId == 0) && (dataRepasse == null || dataRepasse == "")) {
      return this.atendimentos;
    }
    else if (dentistaId == null || dentistaId == 0) {
      atendimentosFiltrados = this.atendimentos;

      atendimentosFiltrados.forEach(
        atendimento => {
          let procedimentosAplicadosFiltrados: ProcedimentoAplicado[] = [];
          atendimento.procedimentosAplicados.forEach(
            (procedimentoAplicado, index, array) => {
              if (procedimentoAplicado.dataRepasse == dataRepasse) {
                procedimentosAplicadosFiltrados.push(procedimentoAplicado);
              }
            }
          );
          atendimento.procedimentosAplicados = procedimentosAplicadosFiltrados;
        } 
      );
      return atendimentosFiltrados;
    }
    
    else if (dataRepasse == null || dataRepasse == "") {
      atendimentosFiltrados = this.atendimentos
        .filter(atendimento => {
          atendimento.dentista!.id == dentistaId;
        });
      return atendimentosFiltrados;
    }
    else {
      atendimentosFiltrados = this.atendimentos
        .filter(atendimento => atendimento.dentista!.id == dentistaId);

      atendimentosFiltrados.forEach(
        atendimento => {
          let procedimentosAplicadosFiltrados: ProcedimentoAplicado[] = [];
          atendimento.procedimentosAplicados.forEach(
            (procedimentoAplicado, index, array) => {
              if (procedimentoAplicado.dataRepasse == dataRepasse) {
                procedimentosAplicadosFiltrados.push(procedimentoAplicado);
              }
            }
          );
          atendimento.procedimentosAplicados = procedimentosAplicadosFiltrados;
        } 
      );
      return atendimentosFiltrados;
    }
  }

  reiniciar(): void {
    this.dataRepasse = "";
    this.dentistaId = 0;
    this.listarAtendimentosPorDentistaPorDataRepasse(0,"");
  }

  setDentistaDataRepasse(dentista: Dentista, dataRepasse: string): void {
    this.dataRepasse = dataRepasse;
    this.dentistaId = dentista.id!;
  }

  downloadReport(): void {
    let atendimentosToDownload: Atendimento[] = 
      this.listarAtendimentosPorDentistaPorDataRepasse(this.dentistaId, this.dataRepasse);
    let filename: string = getFilename(this.dentistaId) + "_" + this.dataRepasse;
    this.downloadService.downloadFile(atendimentosToDownload, filename);
  }

  downloadAllReports(): void {

    let dentistaIds = this.dentistas.map(
      dentista => dentista.id!
    );
    
    if (confirm('Deseja fazer o download de todos os relat??rios, por dentista, \
      para a data selecionada?\nSe n??o selecionar nenhuma data, far?? o download\
      de todas as datas de repasse, tamb??m separados por dentista.')) {
      
      for (let id of dentistaIds) {
        
        let atendimentosToDownload: Atendimento[] = 
          this.listarAtendimentosPorDentistaPorDataRepasse(id, this.dataRepasse);
        let filename: string;
        if (this.dataRepasse == undefined) {
          filename = getFilename(id) + "_todas_as_datas";
        }
        else {
          filename = getFilename(id) + "_" + this.dataRepasse;
        }
        this.downloadService.downloadFile(atendimentosToDownload, filename);
      }

    }

  }

  novaDataRepasse(): void {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let date = yyyy + "-" + mm + "-" + dd;

    if (!(this.novaDataDeRepasse == null || this.novaDataDeRepasse == "")) {
      date = this.novaDataDeRepasse;
    }
    
    let dateOrganized = 
      date.slice(8, 10) + "/" +
      date.slice(5, 7) + "/" +
      date.slice(0, 4);

    if (confirm('Deseja definir a data de ' + dateOrganized + ' como data de repasse?')) {
      if (this.datasRepasse.indexOf(date) == -1) {
        let repasse = new Repasse();
        repasse.dataRepasse = date;
        this.repasseService.inserir(repasse).subscribe(
          () => this.router.navigate(['/pagamentos'])
        );
        this.setDataRepasse(date);
        this.router.navigate(['/pagamentos']);
      }
      else {
        this.setDataRepasse(date);
        this.router.navigate(['/pagamentos']);
      }
    }
    
  }

  setDataRepasse(dataRepasse: string): void {
    for (let atendimento of this.atendimentos) {
      for (let procedimentoAplicado of atendimento.procedimentosAplicados) {
        if (procedimentoAplicado.recebido == true && procedimentoAplicado.repassado == false) {
          procedimentoAplicado.dataRepasse = dataRepasse;
          procedimentoAplicado.repassado = true;
        }
      }
    //Persistir o atendimento no banco, chamar m??todo POST /atendimentos/atendimento.id body = {atendimento}
    this.atendimentoService.atualizar(atendimento).subscribe(
      () => {
        console.log(atendimento);
      }
    );
    }
  }

}

function sumValorRepassado(procedimentosAplicados: ProcedimentoAplicado[]): number {
  let sum: number = 0;
  procedimentosAplicados.forEach(
    (procedimentoAplicado, index, array) => sum = sum + procedimentoAplicado.valorRepassado!
    );
  return sum;
}

function procedimentosAplicadosAtendimentos(atendimentos: Atendimento[]): ProcedimentoAplicado[] {
  let procedimentosAplicadosAtendimentos: ProcedimentoAplicado[] = [];
  let arrayDeProcedimentosAplicados = atendimentos.map(
    atendimento => atendimento.procedimentosAplicados
  );
  arrayDeProcedimentosAplicados.forEach(
    (procedimentosAplicados) => procedimentosAplicadosAtendimentos = procedimentosAplicadosAtendimentos.concat(procedimentosAplicados)
  );
  return procedimentosAplicadosAtendimentos;
}

function getFilename(dentistaId: number): string {
  if (dentistaId == undefined) {
    return "atendimentos_"
  }
  else {
    return "atendimentos_" + dentistaId.toString();
  }
}
