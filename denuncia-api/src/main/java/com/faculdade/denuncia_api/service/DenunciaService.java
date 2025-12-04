package com.faculdade.denuncia_api.service;

import com.faculdade.denuncia_api.dto.DenunciaDTO;
import com.faculdade.denuncia_api.model.Denuncia;
import com.faculdade.denuncia_api.repository.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository repository;

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

    public Denuncia atualizarStatus(Long id, String novoStatus){
        Denuncia denuncia = repository.findById(id).orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        denuncia.setStatus(novoStatus);
        return repository.save(denuncia);
    }
}
