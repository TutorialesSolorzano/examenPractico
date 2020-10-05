package com.examen.pactico.models.services;

import com.examen.pactico.models.documents.Producto;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProductoService {

	
	public Flux<Producto> findByStatus();
	
	public Mono<Producto> save(Producto producto);
	
	public Mono<Producto> update(Producto producto);
	
	public Mono<Void> delete(Producto producto);
	
	public Mono<Producto> findById(String id);
}
