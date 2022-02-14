package com.sweet.home.board.controller;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardsResponse;
import com.sweet.home.board.service.BoardAdminService;
import com.sweet.home.global.aop.AptChecker;
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
@RequestMapping("/api/apts")
public class BoardAdminController {

    private final BoardAdminService boardAdminService;

    public BoardAdminController(BoardAdminService boardAdminService) {
        this.boardAdminService = boardAdminService;
    }

    @AptChecker
    @GetMapping("/{aptId}/admin/boards")
    public ResponseEntity<BoardsResponse> showUnapprovedBoards(@PathVariable Long aptId, @PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(boardAdminService.showUnapprovedBoards(aptId, pageable));
    }

    @AptChecker
    @PostMapping("/{aptId}/admin/boards")
    public ResponseEntity<Void> createBoard(@PathVariable Long aptId, @RequestBody BoardSaveRequest request) {
        boardAdminService.createBoard(aptId, request);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @PostMapping("/{aptId}/admin/boards/{boardId}/approve")
    public ResponseEntity<Void> approveBoard(@PathVariable Long aptId, @PathVariable Long boardId) {
        boardAdminService.approveBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @DeleteMapping("/{aptId}/admin/boards/{boardId}/approve")
    public ResponseEntity<Void> disapproveBoard(@PathVariable Long aptId, @PathVariable Long boardId) {
        boardAdminService.disapproveBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @PutMapping("/{aptId}/admin/boards/{boardId}")
    public ResponseEntity<Void> updateBoard(@PathVariable Long aptId, @PathVariable Long boardId,
        @RequestBody BoardSaveRequest boardSaveRequest) {
        boardAdminService.updateBoard(boardId, boardSaveRequest);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @DeleteMapping("/{aptId}/admin/boards/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long aptId, @PathVariable Long boardId) {
        boardAdminService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
