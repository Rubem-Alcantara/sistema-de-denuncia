package com.faculdade.denuncia_api.dto;

import jakarta.validation.constraints.NotBlank;

public class DenunciaDTO {

    @NotBlank(message = "A descrição do vazamento é obrigatória")
    private String descricao;

    @NotBlank(message = "O nome da empresa é obrigatório")
    private String empresaEnvolvida;

    private boolean anonima;
    private String nomeDenunciante;
    private String emailDenunciante;

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
}
