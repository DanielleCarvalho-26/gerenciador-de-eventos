package com.gerenciador.eventos.DTO;

public class AdminResponseDTO {
    private Long id;
    private String nome;
    private String email;

    //Construtor, Getters e Setters
    public AdminResponseDTO(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
}
