package com.sweet.home.board.controller;

import com.sweet.home.board.service.BoardService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BoardRestController {

    private final BoardService boardService;

    public BoardRestController (BoardService boardService) {
        this.boardService = boardService;
    }
}
