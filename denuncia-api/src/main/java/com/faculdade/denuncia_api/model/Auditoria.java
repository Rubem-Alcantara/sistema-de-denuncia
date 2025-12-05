package com.faculdade.denuncia_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String autor; //Quem fez a mudança
    private String acao; // O que mudou
    private LocalDateTime dataHora;

    // Criando relacionamento: muitas auditórias podem pertencer a mesma denúncia
    @ManyToOne
    @JoinColumn(name = "denuncia_id")
    private Denuncia denuncia;
}
