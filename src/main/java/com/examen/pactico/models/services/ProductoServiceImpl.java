package com.examen.pactico.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examen.pactico.models.dao.ProductoDao;
import com.examen.pactico.models.documents.Producto;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProductoServiceImpl implements ProductoService{

	@Autowired
	private ProductoDao dao;
	
	@Override
	public Flux<Producto> findByStatus() {
		return dao.findAll().filter(producto -> producto.getStatus());
	}

	@Override
	public Mono<Producto> save(Producto producto) {
		return dao.save(producto);
	}

	@Override
	public Mono<Producto> update(Producto producto) {
		return dao.save(producto);
	}

	@Override
	public Mono<Void> delete(Producto producto) {
		dao.save(producto);
		return Mono.empty();
	}
	
	@Override
	public Mono<Producto> findById(String id) {
		return dao.findById(id);
	}

}
