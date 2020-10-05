package com.examen.pactico.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.WebExchangeBindException;

import com.examen.pactico.models.documents.Categoria;
import com.examen.pactico.models.documents.Producto;
import com.examen.pactico.models.services.CategoriaService;
import com.examen.pactico.models.services.ProductoService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/")
public class ProductoController {

	@Autowired
	private ProductoService service;

	@Autowired
	private CategoriaService categoriaService;
	
	private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

	@CrossOrigin
	@GetMapping("/productos")
	public Mono<ResponseEntity<Flux<Producto>>> getProductos() {
		return Mono.just(ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(service.findByStatus()));
	}

	@CrossOrigin
	@GetMapping("/categorias")
	public Mono<ResponseEntity<Flux<Categoria>>> getCategorias() {
		return Mono.just(ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(categoriaService.findAll()));
	}

	@CrossOrigin
	@PostMapping
	public Mono<ResponseEntity<Map<String, Object>>> save(@Valid @RequestBody Mono<Producto> monoProducto) {

		Map<String, Object> respuesta = new HashMap<String, Object>();

		return monoProducto.flatMap(producto -> {
			return service.save(producto).map(p -> {
				respuesta.put("producto", p);
				respuesta.put("mensaje", "Producto creado con éxito");
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(respuesta);
			});
		})

				.onErrorResume(t -> {
					return Mono.just(t).cast(WebExchangeBindException.class).flatMap(e -> Mono.just(e.getFieldErrors()))
							.flatMapMany(Flux::fromIterable).map(fieldError -> "El campo " + fieldError.getField() + " "
									+ fieldError.getDefaultMessage())
							.collectList().flatMap(list -> {
								respuesta.put("errors", list);
								respuesta.put("status", HttpStatus.BAD_REQUEST.value());
								return Mono.just(ResponseEntity.badRequest().body(respuesta));
							});

				});

	}

	@CrossOrigin
	@PutMapping("/{id}")
	public Mono<ResponseEntity<Producto>> update(@RequestBody Producto producto, @PathVariable String id) {
		return service.findById(id).flatMap(p -> {
			p.setNameProduct(producto.getNameProduct());
			p.setCategory(producto.getCategory());
			p.setDescripcion(producto.getDescripcion());
			p.setProductQuantity(producto.getProductQuantity());
			p.setStatus(producto.getStatus());
			return service.update(p);
		}).map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> delete(@PathVariable String id) {
		return service.findById(id).flatMap(p ->{
			p.setStatus(false);
			return service.delete(p).then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
		}).defaultIfEmpty(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
	}
}
