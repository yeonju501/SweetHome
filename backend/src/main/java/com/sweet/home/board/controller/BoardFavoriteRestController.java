package com.sweet.home.board.controller;

import com.sweet.home.article.controller.dto.response.LikeStatusResponse;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.service.BoardFavoriteService;
import com.sweet.home.global.aop.AptChecker;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/apts")
public class BoardFavoriteRestController {

    private final BoardFavoriteService boardFavoriteService;

    public BoardFavoriteRestController(BoardFavoriteService boardFavoriteService) {
        this.boardFavoriteService = boardFavoriteService;
    }

    @AptChecker
    @PostMapping("/{aptId}/boards/{boardId}/favorites")
    public ResponseEntity<Void> addFavorite(@AuthenticationPrincipal String email, @PathVariable Long aptId,
        @PathVariable Long boardId) {
        boardFavoriteService.saveFavorite(email, boardId);
        URI uri = URI.create("/api/apts/" + aptId + "/boards/favorites");
        return ResponseEntity.created(uri).build();
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/{boardId}/favorites")
    public ResponseEntity<LikeStatusResponse> showFavoriteStatus(@AuthenticationPrincipal String email, @PathVariable Long aptId,
        @PathVariable Long boardId) {
        return ResponseEntity.ok().body(new LikeStatusResponse(boardFavoriteService.showFavoriteStatus(email, boardId)));
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/favorites")
    public ResponseEntity<List<BoardResponse>> showFavorites(@AuthenticationPrincipal String email, @PathVariable Long aptId) {
        return ResponseEntity.ok().body(boardFavoriteService.findAllFavorites(email));
    }

    @AptChecker
    @DeleteMapping("/{aptId}/boards/{boardId}/favorites")
    public ResponseEntity<Void> deleteFavorite(@AuthenticationPrincipal String email, @PathVariable Long boardId) {
        boardFavoriteService.deleteFavorite(email, boardId);
        return ResponseEntity.noContent().build();
    }
}
