package com.song.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.song.model.Song;
import com.song.service.ISongService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping(value = "/song")
public class SongController {
	
	@Autowired
	ISongService songService;
	
	@GetMapping("/register")
	public String registerSongGet(Map<String, Object> model) {
		log.info("Song controller: register song GET");
		Song song = new Song();
		model.put("song", song);
		return "song/register-song";
	}
	
	@PostMapping("/register")
	public String postRegistrarEstudiante(@Valid Song song, BindingResult result, Model model, RedirectAttributes flash, SessionStatus status) {

		try {
			
			String urlComplete = "https://docs.google.com/uc?export=download&id="+song.getUrlDrive();
			song.setUrlDrive(urlComplete);
			song.setHasLetter("0");
			songService.saveOrUpdate(song);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "redirect:list";
	}
	
	@GetMapping("/listen/{id}/{language}")
	public String listenSongGet(@PathVariable(value = "id") Integer id,@PathVariable(value = "language") String language, Map<String, Object> model) {
		log.info("Song controller: listen song GET");
		Song song = songService.findById(id);

		log.info(language);
		model.put("song", song);
		model.put("primaryLanguage", language);

		return "song/listen-song";
	}
	
	@GetMapping("/list")
	public String listSongGet(Map<String, Object> model) {
		log.info("Song controller: list of songs GET");
		List<Song> songs = songService.findAll();
		model.put("songs", songs);
		return "song/list-song";
	}
	

}
