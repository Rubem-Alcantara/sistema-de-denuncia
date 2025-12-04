package com.faculdade.denuncia_api.controller;

import com.faculdade.denuncia_api.dto.DenunciaDTO;
import com.faculdade.denuncia_api.model.Denuncia;
import com.faculdade.denuncia_api.service.DenunciaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/denuncias")
@CrossOrigin(origins = "*") //Perimissão para o React acessar a API
public class DenunciaController {

    @Autowired
    private DenunciaService service;

    // Endpoint que cria a denúncia
    @PostMapping
    public ResponseEntity<Denuncia> registrar(@RequestBody @Valid DenunciaDTO dto){
        Denuncia denunciaSalva = service.criarDenuncia(dto);
        return ResponseEntity.ok(denunciaSalva);
    }

    // Endpoint para listar as denúncias (Painel adm)
    @GetMapping
    public ResponseEntity<List<Denuncia>> listar(){
        return ResponseEntity.ok(service.listarTodas());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Denuncia> atualizarStatus(@PathVariable Long id, @RequestParam String novoStatus){
        Denuncia atualizada = service.atualizarStatus(id, novoStatus);
        return ResponseEntity.ok(atualizada);
    }
}
