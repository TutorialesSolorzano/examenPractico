package com.examen.pactico.models.documents;

import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="categorias")
public class Categoria {

	@Id
	@NotEmpty
	private String idCategory;
	
	private String nameCategory;

	public Categoria() {
	}
	
	public String getIdCategory() {
		return idCategory;
	}

	public void setIdCategory(String idCategory) {
		this.idCategory = idCategory;
	}

	public String getNameCategory() {
		return nameCategory;
	}

	public void setNameCategory(String nameCategory) {
		this.nameCategory = nameCategory;
	}

	public Categoria(@NotEmpty String nameCategory) {
		this.nameCategory = nameCategory;
	}
	
	
	
	
}
