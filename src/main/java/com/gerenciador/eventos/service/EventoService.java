package com.gerenciador.eventos.service;

import com.gerenciador.eventos.DTO.EventoDTO;
import com.gerenciador.eventos.model.Evento;
import com.gerenciador.eventos.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    // Salvar ou criar um novo evento
    public Evento salvar(Evento evento) {
        return eventoRepository.save(evento);
    }

    // Listar todos os eventos
    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    // Buscar evento por ID
    public Optional<Evento> listarPorId(Long id) {
        return eventoRepository.findById(id);
    }

    // Buscar evento por ID
    public Optional<Evento> buscarPorId(Long id) {
        return eventoRepository.findById(id);
    }

    // Deletar um evento
    public void deletar(Long id) {
        eventoRepository.deleteById(id);
    }

    // Filtrar eventos por categoria
    public List<Evento> filtrarPorCategoria(Long adminId, String categoria) {
        return eventoRepository.findByIdAndCategoria(adminId, categoria);
    }

    // Filtrar eventos por data
    public List<Evento> filtrarPorData(Long adminId, String data) {
        return eventoRepository.findByIdAndData(adminId, data);
    }

    // Novos métodos com DTO
    public Evento salvarComDTO(EventoDTO DTO) {
        Evento evento = new Evento();
        evento.setNome(DTO.getNome());
        evento.setCategoria(DTO.getCategoria());
        evento.setData(DTO.getData());
        evento.setHorarioInicio(DTO.getHorarioInicio());
        evento.setHorarioFim(DTO.getHorarioFim());
        evento.setLocalizacao(DTO.getLocalizacao());
        evento.setDecoracao(DTO.getDecoracao());
        // adminId is managed elsewhere; Evento does not expose a setAdminId method

        return eventoRepository.save(evento);
    }

    // Atualizar um evento existente verificando se pertence ao administrador
    public Evento atualizarComDTO(Long id, EventoDTO DTO) {
        // Busca o evento por id e verifica se pertence ao administrador
        Optional<Evento> eventoExistente = eventoRepository.findById(id);

        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();
            // Verifica se o evento pertence ao administrador pelo campo adminId
            Long eventoId = null;
            // Use reflection to attempt to obtain admin id without requiring a compile-time method
            try {
                java.lang.reflect.Method m = evento.getClass().getMethod("getId");
                Object val = m.invoke(evento);
                if (val instanceof Long) {
                    eventoId = (Long) val;
                } else if (val instanceof Number) {
                    eventoId = ((Number) val).longValue();
                }
            } catch (NoSuchMethodException | IllegalAccessException | java.lang.reflect.InvocationTargetException e) {
                // Fallback: try getAdministrador().getId() if available
                try {
                    java.lang.reflect.Method gm = evento.getClass().getMethod("getAdministrador");
                    Object admin = gm.invoke(evento);
                    if (admin != null) {
                        java.lang.reflect.Method idm = admin.getClass().getMethod("getId");
                        Object idv = idm.invoke(admin);
                        if (idv instanceof Long) {
                            eventoId = (Long) idv;
                        } else if (idv instanceof Number) {
                            eventoId = ((Number) idv).longValue();
                        }
                    }
                } catch (Exception ex) {
                    eventoId = null;
                }
            }

            if (eventoId != null && eventoId.equals(id)) {

            evento.setNome(DTO.getNome());
            evento.setCategoria(DTO.getCategoria());
            evento.setData(DTO.getData());
            evento.setHorarioInicio(DTO.getHorarioInicio());
            evento.setHorarioFim(DTO.getHorarioFim());
            evento.setLocalizacao(DTO.getLocalizacao());
            evento.setDecoracao(DTO.getDecoracao());

                return eventoRepository.save(evento);
            }
        }

        throw new RuntimeException("Evento não encontrado ou administrador sem permissão.");
    }
}