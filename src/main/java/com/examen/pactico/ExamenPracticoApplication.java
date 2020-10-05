package com.examen.pactico;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import com.examen.pactico.models.documents.Categoria;
import com.examen.pactico.models.services.CategoriaService;

import reactor.core.publisher.Flux;

@SpringBootApplication
public class ExamenPracticoApplication implements CommandLineRunner{

	private static final Logger log = LoggerFactory.getLogger(ExamenPracticoApplication.class);
	
	@Autowired
	private ReactiveMongoTemplate mongoTemplate;
	
	@Autowired
	private CategoriaService service;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamenPracticoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		mongoTemplate.dropCollection("categorias").subscribe();
		Categoria bebidas = new Categoria("Bebidas");
		Categoria limpieza = new Categoria("Limpieza");
		Categoria botanas = new Categoria("Botanas");
		Categoria cremeria = new Categoria("Cremeria");
	
		Flux.just(bebidas, limpieza, botanas, cremeria)
		.flatMap(service::save)
		.subscribe(c ->{
			log.info("Categoria creada: " + c.getNameCategory() + ", Id: " + c.getIdCategory());
		});
	}
}
