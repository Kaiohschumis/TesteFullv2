package br.com.kaiosx.clienteapi.servico;

import br.com.kaiosx.clienteapi.controller.dto.AtualizarClienteRequest;
import br.com.kaiosx.clienteapi.controller.dto.IncluirClienteRequest;
import br.com.kaiosx.clienteapi.dao.ClienteRepository;
import br.com.kaiosx.clienteapi.exception.ClienteNaoEncontradoException;
import br.com.kaiosx.clienteapi.modelo.Cliente;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente getCliente(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado " + id));
    }

    public Cliente incluir(IncluirClienteRequest clienteRequest) {
        var cliente = new Cliente();
        BeanUtils.copyProperties(clienteRequest, cliente);
        clienteRepository.save(cliente);

        return cliente;
    }

    public Cliente atualizar(AtualizarClienteRequest atualizarClienteRequest) {
        var cliente = clienteRepository.findById(atualizarClienteRequest.getId()).get();

        BeanUtils.copyProperties(atualizarClienteRequest, cliente);
        clienteRepository.save(cliente);
        return cliente;
    }

    public void deletar(Long id) {
        clienteRepository.deleteById(id);
    }
}

