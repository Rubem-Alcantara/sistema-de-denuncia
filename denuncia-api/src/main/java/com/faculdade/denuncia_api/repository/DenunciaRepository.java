package com.faculdade.denuncia_api.repository;

import com.faculdade.denuncia_api.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    Optional<Denuncia> findByProtocolo(String protocolo);
}
