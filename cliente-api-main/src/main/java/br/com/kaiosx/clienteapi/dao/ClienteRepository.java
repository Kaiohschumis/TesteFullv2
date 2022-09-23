package br.com.kaiosx.clienteapi.dao;

import br.com.kaiosx.clienteapi.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findAll();
}
