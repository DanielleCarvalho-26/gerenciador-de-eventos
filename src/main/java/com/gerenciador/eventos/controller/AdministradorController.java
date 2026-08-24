package com.gerenciador.eventos.controller;

import com.gerenciador.eventos.DTO.AdminRequestDTO;
import com.gerenciador.eventos.DTO.AdminResponseDTO;
import com.gerenciador.eventos.DTO.TokenResponseDTO;
import com.gerenciador.eventos.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    // Rota de cadastro
    @PostMapping
    public ResponseEntity<AdminResponseDTO> cadastrar(@RequestBody AdminRequestDTO request) {
        AdminResponseDTO novoAdmin = administradorService.cadastrarAdministrador(request);
        return ResponseEntity.ok(novoAdmin);
    }

    // Rota de login, retorna o Token JWT
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody AdminRequestDTO request) {
        String token = administradorService.login(request.getEmail(), request.getSenha());
        return ResponseEntity.ok(new TokenResponseDTO(token));
    }
}