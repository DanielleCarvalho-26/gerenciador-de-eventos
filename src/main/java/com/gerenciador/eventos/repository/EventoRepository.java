package com.gerenciador.eventos.repository;

import com.gerenciador.eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Método para buscar um evento específico por ID
    Optional<Evento> findById(Long id);

    // Método para buscar eventos do administrador por categoria
    List<Evento> findByIdAndCategoria(Long id, String categoria);

    // Método para buscar eventos do administrador por data
    List<Evento> findByIdAndData(Long id, String data);
}