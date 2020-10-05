package com.examen.pactico.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examen.pactico.models.dao.CategoriaDao;
import com.examen.pactico.models.documents.Categoria;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CategoriaServiceImpl implements CategoriaService {

	@Autowired
	private CategoriaDao dao;

	@Override
	public Mono<Categoria> save(Categoria categoria) {
		return dao.save(categoria);
	}

	@Override
	public Flux<Categoria> findAll() {
		return dao.findAll();
	}

}
