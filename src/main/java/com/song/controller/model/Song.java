package com.song.controller.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Song implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idSong;
	
	private String name;
	private String author;
	private String urlDrive;
	
	@JsonIgnoreProperties(value={"song","hibernateLazyInitializer","handler"}, allowSetters=true)
	@OneToMany(fetch=FetchType.LAZY, mappedBy="song")
	List<Letter> letters;
}
