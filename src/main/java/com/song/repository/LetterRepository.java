package com.song.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.song.model.Letter;

public interface LetterRepository extends JpaRepository<Letter, Integer> {

}
