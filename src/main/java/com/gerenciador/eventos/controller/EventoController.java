package com.gerenciador.eventos.controller;

import com.gerenciador.eventos.DTO.EventoDTO;
import com.gerenciador.eventos.model.Evento;
import com.gerenciador.eventos.service.EventoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
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

    // 2. Rota para filtrar todos os eventos
    @GetMapping
    public ResponseEntity<List<Evento>> listarTodos() {
        List<Evento> eventos = eventoService.listarTodos(); //Certifique-se de que o service possui esse método de listagem geral
        return ResponseEntity.ok(eventos);
    }

    // Lista Eventos por Administrador
    @GetMapping("/id/{id}")
    public ResponseEntity<Evento> listarPorId(@PathVariable Long id) {
        Optional<Evento> evento = eventoService.listarPorId(id);
        return evento.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. Atualizar Evento
        @PutMapping("/{id}")
        public ResponseEntity<Object> atualizarEvento(
                @PathVariable Long id,
                @RequestBody EventoDTO eventoAtualizado) {
            try {
                Evento evento = eventoService.atualizarComDTO(id, eventoAtualizado);
                return ResponseEntity.ok(evento);
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

    // 4. Deletar Evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Rota para filtrar Eventos por categoria: /api/eventos/admin/1/categoria/Aniversário
    @GetMapping("/id/{id}/categoria/{categoria}")
    public ResponseEntity<List<Evento>> buscarPorCategoria(@PathVariable Long id, @PathVariable String categoria) {
        return ResponseEntity.ok(eventoService.filtrarPorCategoria(id, categoria));
    }

    // Rota para filtrar Eventos por data: /api/eventos/admin/1/data/01/11/2026
    @GetMapping("/id/{id}/data")
    public ResponseEntity<List<Evento>> buscarPorData(@PathVariable Long id, @RequestParam String data){
        List<Evento> eventos = eventoService.filtrarPorData(id, data);
        return ResponseEntity.ok(eventos);
    }
}
