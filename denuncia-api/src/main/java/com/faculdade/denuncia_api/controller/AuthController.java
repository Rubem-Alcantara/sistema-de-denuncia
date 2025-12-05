package com.faculdade.denuncia_api.controller;

import com.faculdade.denuncia_api.model.Admin;
import com.faculdade.denuncia_api.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder; //Ferramenta que faz a criptografia

    // Endpoint para testar se o login funciou
    // Se conseguir acessar a rota, significa que está logado
    @GetMapping("/check")
    public String checkLogin(){
        return "Autenticado com sucesso!";
    }

    @Bean
    public CommandLineRunner initAdmin(){
        return args ->{
            // Verificando se já existe algum admin. Se for 0, cria um padrão
            if (repository.count() == 0){
                Admin admin = new Admin();
                admin.setLogin("admin");

                admin.setSenha(passwordEncoder.encode("123456"));

                repository.save(admin);
                System.out.println("ADMINISTRADOR PADRÃO CRIADO: admin / 123456");
            }
        };
    }

}
