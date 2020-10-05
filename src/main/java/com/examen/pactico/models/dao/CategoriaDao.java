package com.examen.pactico.models.dao;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.examen.pactico.models.documents.Categoria;

public interface CategoriaDao extends ReactiveMongoRepository<Categoria, String>{

}
