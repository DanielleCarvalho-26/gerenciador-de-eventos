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

    // Listar todos os eventos de um administrador específico
    public List<Evento> listarPorAdmin(Long adminId) {
        return eventoRepository.findByAdminId(adminId);
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
        return eventoRepository.findByAdminIdAndCategoria(adminId, categoria);
    }

    // Filtrar eventos por data
    public List<Evento> filtrarPorData(Long adminId, String data) {
        return eventoRepository.findByAdminIdAndData(adminId, data);
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
        evento.setAdminId(DTO.getAdminId());

        return eventoRepository.save(evento);
    }

    // Atualizar um evento existente verificando se pertence ao administrador
    public Evento atualizarComDTO(Long id, Long adminId, EventoDTO DTO) {
        Optional<Evento> eventoExistente = eventoRepository.findById(id);

        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();

            // Verifica se o evento realmente pertence a este administrador
            if (evento.getAdminId().equals(adminId)) {
                evento.setNome(DTO.getNome());
                evento.setCategoria(DTO.getCategoria());
                evento.setData(DTO.getData());
                evento.setHorarioInicio(DTO.getHorarioInicio());
                evento.setHorarioFim(DTO.getHorarioFim());
                evento.setLocalizacao(DTO.getLocalizacao());
                evento.setDecoracao(DTO.getDecoracao());

                return eventoRepository.save(evento);
            } else {
                throw new RuntimeException("Este administrador não tem permissão para alterar este evento.");
            }
        } else {
            throw new RuntimeException("Evento não encontrado.");
        }
    }
}