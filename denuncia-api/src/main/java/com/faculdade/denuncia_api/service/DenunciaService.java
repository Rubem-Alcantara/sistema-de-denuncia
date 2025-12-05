package com.faculdade.denuncia_api.service;

import com.faculdade.denuncia_api.dto.DenunciaDTO;
import com.faculdade.denuncia_api.model.Denuncia;
import com.faculdade.denuncia_api.model.Auditoria;
import com.faculdade.denuncia_api.repository.DenunciaRepository;
import com.faculdade.denuncia_api.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository repository;
    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public Denuncia criarDenuncia(DenunciaDTO dados){
        Denuncia novaDenuncia = new Denuncia();

        novaDenuncia.setDescricao(dados.getDescricao());
        novaDenuncia.setEmpresaEnvolvida(dados.getEmpresaEnvolvida());
        novaDenuncia.setAnonima(dados.isAnonima());

        //REGRA DE NEGOCIO
        // Se a denúncia for anônima, faremos com que nenhum dado pessoal seja salvo
        // Se o front mandar o nome, o back irá ignorar.

        if (dados.isAnonima()){
            novaDenuncia.setNomeDenunciante(null);
            novaDenuncia.setEmailDenunciante(null);
        } else {
            novaDenuncia.setNomeDenunciante(dados.getNomeDenunciante());
            novaDenuncia.setEmailDenunciante(dados.getEmailDenunciante());
        }

        // Gerando protocólo aleatório
        novaDenuncia.setProtocolo(UUID.randomUUID().toString().substring(0,8).toUpperCase());

        //Definindo data e status iniciais
        novaDenuncia.setDataCriacao(LocalDateTime.now());
        novaDenuncia.setStatus("PENDENTE");

        return repository.save(novaDenuncia);
    }

    public java.util.List<Denuncia> listarTodas(){
        return repository.findAll();
    }

    public Denuncia atualizarStatus(Long id, String novoStatus) {
        Denuncia denuncia = repository.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        String statusAntigo = denuncia.getStatus(); // Guarda o status velho
        denuncia.setStatus(novoStatus); // Aplica o novo

        Denuncia denunciaSalva = repository.save(denuncia); // Salva

        // Criando o LOG
        Auditoria log = new Auditoria();
        log.setDenuncia(denunciaSalva);
        log.setDataHora(LocalDateTime.now());

        // Pega quem está logado automaticamente
        String usuarioLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        log.setAutor(usuarioLogado);

        log.setAcao("Alterou status de [" + statusAntigo + "] para [" + novoStatus + "]");

        auditoriaRepository.save(log); // Salva o rastro

        return denunciaSalva;
    }
}
