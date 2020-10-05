package com.examen.pactico.models.services;

import com.examen.pactico.models.documents.Categoria;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CategoriaService {

	public Mono<Categoria> save(Categoria categoria);
	
	public Flux<Categoria> findAll();
	
}
