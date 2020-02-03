package com.song.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.song.controller.model.Letter;
import com.song.controller.model.Song;
import com.song.service.ILetterService;
import com.song.service.ISongService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping(value = "/letter")
public class LetterController {
	
	@Autowired
	ISongService songService;
	
	@Autowired
	ILetterService letterService;
	
	@GetMapping("/register/{id}")
	public String registerLetterGet(@PathVariable(value = "id") Integer id, Map<String, Object> model) {
		log.info("Letter controller: register letter GET");
		Song song = songService.findById(id);
		
		
		model.put("songAudioLink", song.getUrlDrive());
		return "letter/register-letter";
	}
	
	@RequestMapping(value = "/register/{id}", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Map<String, Object> registerLetterPost(@PathVariable(value = "id") Integer id, @RequestBody List<Letter> letters){
		Map<String, Object> map = new HashMap<String, Object>();
		Song song = songService.findById(id);
		song.setLetters(letters);
		
		for(Letter letter : letters) {
			letter.setSong(song);
			letterService.saveOrUpdate(letter);
		}
		
		map.put("status", true);
		return map;
	}

}
