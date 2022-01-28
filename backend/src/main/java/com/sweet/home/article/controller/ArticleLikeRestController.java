package com.sweet.home.article.controller;

import com.sweet.home.article.service.ArticleLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boards")
public class ArticleLikeRestController {

    private final ArticleLikeService articleLikeService;

    public ArticleLikeRestController(ArticleLikeService articleLikeService) {
        this.articleLikeService = articleLikeService;
    }

    @PostMapping("/{boardId}/articles/{articleId}/likes")
    public ResponseEntity<Void> LikeArticle(@AuthenticationPrincipal String email, @PathVariable Long boardId,
        @PathVariable Long articleId) {
        articleLikeService.LikeArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }
}