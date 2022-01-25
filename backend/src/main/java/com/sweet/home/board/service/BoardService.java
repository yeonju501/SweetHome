package com.sweet.home.board.service;

import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Transactional
    public List<BoardResponse> findBoard() {
        List<Board> boardList = boardRepository.findAll();
        return boardList
            .stream()
            .map(BoardResponse::from)
            .collect(Collectors.toList());
    }
}
