package com.sweet.home.board.controller;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.controller.dto.response.BoardsResponse;
import com.sweet.home.board.service.BoardAdminService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    // 요청 게시판 목록 조회
    @GetMapping("/boards/")
    public ResponseEntity<BoardsResponse> showUnapprovedBoards(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(boardAdminService.showUnapprovedBoards(pageable));
    }

    // 요청 게시판 status 변경
    @PostMapping("/boards/{boardId}")
    public ResponseEntity<Void> approveBoard(@PathVariable Long boardId) {
        boardAdminService.approveBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    // 요청 게시판 업데이트
    @PutMapping("/boards/{boardId}")
    public ResponseEntity<Void> updateBoard(@PathVariable Long boardId, @RequestBody BoardSaveRequest boardSaveRequest){
        boardAdminService.updateBoard(boardId, boardSaveRequest);
        return ResponseEntity.noContent().build();
    }

    // 요청게시판 삭제
    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardAdminService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
