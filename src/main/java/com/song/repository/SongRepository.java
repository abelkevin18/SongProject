package com.song.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.song.controller.model.Song;

public interface SongRepository extends JpaRepository<Song, Integer> {

}
