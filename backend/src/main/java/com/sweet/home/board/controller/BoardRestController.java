package com.sweet.home.board.controller;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.service.BoardService;
import com.sweet.home.global.aop.AptChecker;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/apts")
public class BoardRestController {

    private final BoardService boardService;

    public BoardRestController(BoardService boardService) {
        this.boardService = boardService;
    }

    @AptChecker
    @GetMapping("/{aptId}/boards")
    public ResponseEntity<List<BoardResponse>> showBoards(@PathVariable Long aptId) {
        return ResponseEntity.ok().body(boardService.findAllBoards(aptId));
    }

    @AptChecker
    @PostMapping("/{aptId}/boards")
    public ResponseEntity<Void> createBoard(@RequestBody BoardSaveRequest request, @PathVariable Long aptId) {
        boardService.saveBoard(request, aptId);
        URI uri = URI.create("/api/" + aptId + "/boards");
        return ResponseEntity.created(uri).build();
    }
}
