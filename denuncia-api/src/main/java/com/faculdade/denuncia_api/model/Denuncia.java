package com.faculdade.denuncia_api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity // Criando tabela no banco
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    //Gerando o protocolo que o usuário recebe.
    @Column(unique = true)
    private String protocolo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String empresaEnvolvida;

    private boolean anonima;

    private String nomeDenunciante;
    private String emailDenunciante;

    private LocalDateTime dataCriacao;

    private String status;

    @Column(length = 2000)
    private String respostaAuditoria;

    public String getRespostaAuditoria() {
        return respostaAuditoria;
    }

    public void setRespostaAuditoria(String respostaAuditoria) {
        this.respostaAuditoria = respostaAuditoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEmpresaEnvolvida() {
        return empresaEnvolvida;
    }

    public void setEmpresaEnvolvida(String empresaEnvolvida) {
        this.empresaEnvolvida = empresaEnvolvida;
    }

    public boolean isAnonima() {
        return anonima;
    }

    public void setAnonima(boolean anonima) {
        this.anonima = anonima;
    }

    public String getNomeDenunciante() {
        return nomeDenunciante;
    }

    public void setNomeDenunciante(String nomeDenunciante) {
        this.nomeDenunciante = nomeDenunciante;
    }

    public String getEmailDenunciante() {
        return emailDenunciante;
    }

    public void setEmailDenunciante(String emailDenunciante) {
        this.emailDenunciante = emailDenunciante;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
