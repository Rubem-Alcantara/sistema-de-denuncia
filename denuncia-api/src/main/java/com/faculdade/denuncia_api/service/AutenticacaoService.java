package com.faculdade.denuncia_api.service;

import com.faculdade.denuncia_api.model.Admin;
import com.faculdade.denuncia_api.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private AdminRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        // Buscando usuário no banco
        Admin admin = repository.findByLogin(username);

        if (admin == null){
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        // Transformando o objeto no user do spring security

        return User.builder()
                .username(admin.getLogin())
                .password(admin.getSenha())
                .roles("ADMIN")
                .build();
    }

}
