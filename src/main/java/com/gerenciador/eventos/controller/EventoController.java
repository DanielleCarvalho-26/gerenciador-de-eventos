package com.gerenciador.eventos.controller;

import com.gerenciador.eventos.DTO.EventoDTO;
import com.gerenciador.eventos.model.Evento;
import com.gerenciador.eventos.service.EventoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoController {
    
    @Autowired
    private EventoService eventoService;

    // 1. Cadastrar Evento
    @PostMapping
    public ResponseEntity<Evento> criarEvento(@RequestBody EventoDTO eventoDTO) {
        Evento novoEvento = eventoService.salvar(converterDTOParaEvento(eventoDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEvento);
    }

    private Evento converterDTOParaEvento(EventoDTO eventoDTO) {
        Evento evento = new Evento();
        BeanUtils.copyProperties(eventoDTO, evento);
        return evento;
    }

    // 2. Lista Eventos por Administrador
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Evento>> listarPorAdmin(@PathVariable Long adminId) {
        List<Evento> eventos = eventoService.listarPorAdmin(adminId);
        return ResponseEntity.ok(eventos);
    }

    // 3. Atualizar Evento
    @PutMapping("/{id}/admin/{adminId}")
    public ResponseEntity<Object> atualizarEvento(
        @PathVariable Long id,
        @PathVariable Long adminId,
        @RequestBody EventoDTO eventoAtualizado) {
      try {
        Evento evento = eventoService.atualizarComDTO(id, adminId, eventoAtualizado);
        return ResponseEntity.ok(evento);
      } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
      }
    }

    // 4. Deletar Evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Rota para filtrar Eventos por categoria: /api/eventos/admin/1/categoria/Aniversário
    @GetMapping("/admin/{adminId}/categoria/{categoria}")
    public ResponseEntity<List<Evento>> buscarPorCategoria(@PathVariable Long adminId, @PathVariable String categoria) {
        return ResponseEntity.ok(eventoService.filtrarPorCategoria(adminId, categoria));
    }

    // Rota para filtrar Eventos por data: /api/eventos/admin/1/data/01/11/2026
    @GetMapping("/admin/{adminId}/data")
    public ResponseEntity<List<Evento>> buscarPorData(@PathVariable Long adminId, @RequestParam String data){
        List<Evento> eventos = eventoService.filtrarPorData(adminId, data);
        return ResponseEntity.ok(eventos);
    }
}
