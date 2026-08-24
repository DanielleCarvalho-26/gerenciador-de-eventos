package com.gerenciador.eventos.repository;

import com.gerenciador.eventos.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Administrador findByEmail(String email);
}