package br.com.kaiosx.clienteapi.modelo;

import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Data
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String cpf;

    private String nome;

    private String cep;

    private String endereco;

    private String numero;

    private String bairro;

    private String complemento;

    private String municipio;

    private String uf;

    @Column(unique = true)
    private String rg;

    private String email;

    @Lob
    private byte[] foto;
}
