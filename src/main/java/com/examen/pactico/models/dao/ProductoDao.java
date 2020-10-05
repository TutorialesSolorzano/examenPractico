package com.examen.pactico.models.dao;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.examen.pactico.models.documents.Producto;

public interface ProductoDao extends ReactiveMongoRepository<Producto, String> {

}
