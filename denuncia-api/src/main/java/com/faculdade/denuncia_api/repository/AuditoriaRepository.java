package com.faculdade.denuncia_api.repository;

import com.faculdade.denuncia_api.model.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
}
