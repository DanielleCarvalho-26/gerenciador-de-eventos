package com.gerenciador.eventos.service;

import com.gerenciador.eventos.DTO.AdminRequestDTO;
import com.gerenciador.eventos.DTO.AdminResponseDTO;
import com.gerenciador.eventos.model.Administrador;
import com.gerenciador.eventos.repository.AdministradorRepository;
import com.gerenciador.eventos.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Cadastrar Administrador usando DTO
    public AdminResponseDTO cadastrarAdministrador(AdminRequestDTO request) {
        Administrador administrador = new Administrador();
        administrador.setNome(request.getNome());
        administrador.setEmail(request.getEmail());
        // Aqui você pode adicionar a lógica de criptografia da senha usando o PasswordEncoder antes de salvar no banco de dados
        administrador.setSenha(passwordEncoder.encode(request.getSenha()));

        Administrador savedAdministrador = administradorRepository.save(administrador);

        // Retorna o DTO sem expor a senha
        return new AdminResponseDTO(savedAdministrador.getId(), savedAdministrador.getNome(), savedAdministrador.getEmail());
    }

    // Login que valida a senha criptografada usando PasswordEncoder e retorna o Token JWT
    public String login(String email, String senha) {
        Administrador administrador = administradorRepository.findByEmail(email);

        if (administrador != null && passwordEncoder.matches(senha, administrador.getSenha())) {
            // Gera e retonra o token JWT usando o JwtUtil
            return jwtUtil.gerarToken(administrador.getEmail());
        }
            throw new RuntimeException("Credenciais inválidas");
    }
}