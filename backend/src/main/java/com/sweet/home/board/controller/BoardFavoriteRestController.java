package com.sweet.home.board.controller;

import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.service.BoardFavoriteService;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BoardFavoriteRestController {

    private final BoardFavoriteService boardFavoriteService;

    public BoardFavoriteRestController(BoardFavoriteService boardFavoriteService) {
        this.boardFavoriteService = boardFavoriteService;
    }

    @PostMapping("/boards/{boardId}/favorites")
    public ResponseEntity<Void> addFavorite(@AuthenticationPrincipal String email, @PathVariable Long boardId) {
        boardFavoriteService.saveFavorite(email, boardId);
        URI uri = URI.create("/api/boards/favorites");
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/boards/favorites")
    public ResponseEntity<List<BoardResponse>> showFavorites(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(boardFavoriteService.findAllFavorites(email));
    }
}
