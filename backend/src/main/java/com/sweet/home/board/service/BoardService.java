package com.sweet.home.board.service;

import com.sweet.home.board.domain.BoardRepository;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService (BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }
}
