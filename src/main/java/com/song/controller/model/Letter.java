package com.song.controller.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Letter implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idLetter;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_song")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Song song;
	
	private String startTime;
	private String endTime;
	private String letterSpanish;
	private String letterEnglish;
	
	

}
