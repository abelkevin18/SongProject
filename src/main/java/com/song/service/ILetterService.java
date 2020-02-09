package com.song.service;

import java.util.List;

import com.song.model.Letter;

public interface ILetterService {
	Letter saveOrUpdate(Letter letter);
	Letter findById(int id);
	List<Letter> findAll();
}
