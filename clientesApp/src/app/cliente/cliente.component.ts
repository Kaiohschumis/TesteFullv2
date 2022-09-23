import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../modelo/cliente';
import { ClienteService } from '../service/cliente.service';
import { CepService } from './cep.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService, private cepService: CepService, private httpCliente: HttpClient) { }
  @ViewChild('btnFechar') private btnFechar!: ElementRef<HTMLElement>;
  @ViewChild('divPrincipal') private divPrincipal!: ElementRef<HTMLElement>;
  public clientes: Cliente[] = [];
  public clienteSelecionado: Cliente = ClienteComponent.criarCliente();
  private arquivoSelecionado: File | undefined;

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.clienteService.listar().subscribe((response: Cliente[]) => {
      this.clientes = response;
      console.log(this.clientes);
    },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      }
    );
  }

  public add() {
    this.clienteSelecionado = ClienteComponent.criarCliente();
    this.abrirDetalhe(this.clienteSelecionado, 'add');
  }

  public abrirDetalhe(cliente: Cliente, operacao: string) {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (operacao === 'add') {
      button.setAttribute('data-target', '#clienteModal');
    }
    if (operacao === 'edit') {
      this.clienteSelecionado = cliente;
      button.setAttribute('data-target', '#clienteModal');
    }
    if (operacao === 'delete') {
      this.clienteSelecionado = cliente;
      button.setAttribute('data-target', '#deleteClienteModal');
    }
    this.divPrincipal.nativeElement.appendChild(button);
    button.click();

  }

  public filtrar(termo: string): void {
    console.log(termo);
    const results: Cliente[] = [];
    for (const cliente of this.clientes) {
      if (cliente.nome?.toLowerCase().indexOf(termo.toLowerCase()) !== -1
        || cliente.email?.toLowerCase().indexOf(termo.toLowerCase()) !== -1
      ) {
        results.push(cliente);
      }
    }
    this.clientes = results;
    if (results.length === 0 || !termo) {
      this.listar();
    }
  }

  public salvarCliente() {
    const formData = new FormData();

    if (!this.arquivoSelecionado && !this.clienteSelecionado.foto) {
      console.log("Arquivo não selecionado!");
      return;
    }

    // @ts-ignore
    formData.append('file', this.arquivoSelecionado || this.clienteSelecionado.foto);


    this.btnFechar.nativeElement.click();
    if (this.clienteSelecionado) {
      this.clienteService.salvar(this.clienteSelecionado, formData).subscribe(
        (response: Cliente) => {
          console.log(response);
          this.listar();
          ClienteComponent.criarCliente();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public deletar(id: number | undefined): void {
    if (id) {
      this.clienteService.deletar(id).subscribe(
        (response: void) => {
          console.log(response);
          this.listar();
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
    }
  }

  static criarCliente(): Cliente {
    return {

      id: 0,
      cep: "",
      endereco: "",
      bairro: "",
      municipio: "",
      uf: ""

    }
  }

  selecionarArquivo(event: Event) {
    // @ts-ignore
    this.arquivoSelecionado = event.target.files[0];
  }

  exibirImagem(foto: any) {
    return 'data:image/jpeg;base64,' + foto;
  }

  consultaCep() {
    this.cepService.buscar(this.clienteSelecionado.cep)
  }

  buscar(cep: string) {
    return this.httpCliente.get(`https://viacep.com.br/ws/${cep}/json`)
      .toPromise()
      .then(response => {
        console.log(response)
        return this.converteCep(response)
      })
  }

  converteCep(response: any) {
    let cliente = this.clienteSelecionado;
    cliente.cep = response.cep;
    cliente.endereco = response.logradouro;
    cliente.bairro = response.bairro;
    cliente.municipio = response.localidade
    cliente.uf = response.uf;
    return cliente;
  }

}
