package com.song.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.song.controller.model.Song;
import com.song.repository.SongRepository;
import com.song.service.ISongService;

@Service
public class SongServiceImpl implements ISongService{

	@Autowired
	SongRepository songRepository;
	
	@Override
	public Song saveOrUpdate(Song song) {
		
		return songRepository.save(song);
	}

	@Override
	public Song findById(int id) {
		return songRepository.findById(id).orElse(null);
	}

	@Override
	public List<Song> findAll() {
		return songRepository.findAll();
	}

}
