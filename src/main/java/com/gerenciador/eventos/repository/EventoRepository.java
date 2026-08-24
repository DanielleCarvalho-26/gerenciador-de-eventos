package com.gerenciador.eventos.repository;

import com.gerenciador.eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Método para buscar todos os eventos associados a um administrador específico
    List<Evento> findByAdminId(Long adminId);

    // Método para buscar eventos do administrador por categoria
    List<Evento> findByAdminIdAndCategoria(Long adminId, String categoria);

    // Método para buscar eventos do administrador por data
    List<Evento> findByAdminIdAndData(Long adminId, String data);
}