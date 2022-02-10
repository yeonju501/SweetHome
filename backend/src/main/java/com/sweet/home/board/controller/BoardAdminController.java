package com.sweet.home.board.controller;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardsResponse;
import com.sweet.home.board.service.BoardAdminService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class BoardAdminController {

    private final BoardAdminService boardAdminService;

    public BoardAdminController(BoardAdminService boardAdminService) {
        this.boardAdminService = boardAdminService;
    }

    @GetMapping("/boards")
    public ResponseEntity<BoardsResponse> showUnapprovedBoards(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(boardAdminService.showUnapprovedBoards(pageable));
    }

    @PostMapping("/boards")
    public ResponseEntity<Void> createBoard(@RequestBody BoardSaveRequest request) {
        boardAdminService.createBoard(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/boards/{boardId}/approve")
    public ResponseEntity<Void> approveBoard(@PathVariable Long boardId) {
        boardAdminService.approveBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/boards/{boardId}/approve")
    public ResponseEntity<Void> disapproveBoard(@PathVariable Long boardId) {
        boardAdminService.disapproveBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/boards/{boardId}")
    public ResponseEntity<Void> updateBoard(@PathVariable Long boardId, @RequestBody BoardSaveRequest boardSaveRequest) {
        boardAdminService.updateBoard(boardId, boardSaveRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardAdminService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
