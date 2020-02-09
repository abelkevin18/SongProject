package com.song.service;

import java.util.List;

import com.song.model.Song;

public interface ISongService {
	Song saveOrUpdate(Song song);
	Song findById(int id);
	List<Song> findAll();
}
