package com.song.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.song.controller.model.Letter;

public interface LetterRepository extends JpaRepository<Letter, Integer> {

}
