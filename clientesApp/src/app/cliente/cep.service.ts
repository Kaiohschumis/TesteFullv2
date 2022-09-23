import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from '../modelo/cliente';
import { ClienteComponent } from "./cliente.component";

@Injectable({
    providedIn: "root"
})
export class CepService {
    clienteSelecionado: Cliente = ClienteComponent.criarCliente();
    constructor(private httpCliente: HttpClient) {
        
    }
    
    buscar(cep: string) {
        return this.httpCliente.get(`https://viacep.com.br/ws/${cep}/json`)
        .toPromise()
        .then(response => {
            console.log(response)
            return this.converteCep(response)
        })
    }

    converteCep(response: any){
        let cliente = this.clienteSelecionado;
         cliente.cep = response.cep;
         cliente.endereco = response.logradouro;
         cliente.bairro = response.bairro;
         cliente.municipio = response.localidade
         cliente.uf = response.uf;
         return cliente;
    }
    
}