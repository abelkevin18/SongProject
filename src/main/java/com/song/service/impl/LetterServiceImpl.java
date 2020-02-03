package com.song.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.song.controller.model.Letter;
import com.song.repository.LetterRepository;
import com.song.service.ILetterService;

@Service
public class LetterServiceImpl implements ILetterService{
	
	@Autowired
	LetterRepository letterRepository;

	@Override
	public Letter saveOrUpdate(Letter letter) {
		
		return letterRepository.save(letter);
	}

	@Override
	public Letter findById(int id) {
		
		return letterRepository.findById(id).orElse(null);
	}

	@Override
	public List<Letter> findAll() {
		
		return letterRepository.findAll();
	}

}
