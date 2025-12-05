package com.faculdade.denuncia_api.controller;

import com.faculdade.denuncia_api.dto.DenunciaDTO;
import com.faculdade.denuncia_api.model.Denuncia;
import com.faculdade.denuncia_api.service.DenunciaService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; // Importante importar o Optional

@RestController
@RequestMapping("/api/denuncias")
@CrossOrigin(origins = "*")
public class DenunciaController {

    @Autowired
    private DenunciaService service;

    //Endpoint que cria a denúncia
    @PostMapping
    public ResponseEntity<Denuncia> registrar(@RequestBody @Valid DenunciaDTO dto){
        Denuncia denunciaSalva = service.criarDenuncia(dto);
        return ResponseEntity.ok(denunciaSalva);
    }

    //Endpoint para listar todas (Painel Admin)
    @GetMapping
    public ResponseEntity<List<Denuncia>> listar(){
        return ResponseEntity.ok(service.listarTodas());
    }

    //Endpoint para consultar por Protocolo (Tela Acompanhar)
    @GetMapping("/protocolo/{protocolo}")
    public ResponseEntity<Denuncia> consultarPorProtocolo(@PathVariable String protocolo) {

        Optional<Denuncia> denuncia = service.buscarPorProtocolo(protocolo);

        return denuncia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Endpoint para atualizar status
    @PutMapping("/{id}/status")
    public ResponseEntity<Denuncia> atualizarStatus(@PathVariable Long id, @RequestParam String novoStatus){
        Denuncia atualizada = service.atualizarStatus(id, novoStatus);
        return ResponseEntity.ok(atualizada);
    }

    @PutMapping("/{id}/resposta")
    public ResponseEntity<Denuncia> responderDenuncia(@PathVariable Long id,@RequestBody String resposta ){
        Denuncia atualizada = service.salvarResposta(id, resposta);
        return ResponseEntity.ok(atualizada);
    }
}