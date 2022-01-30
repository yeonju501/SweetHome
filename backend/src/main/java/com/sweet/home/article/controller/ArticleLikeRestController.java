package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.response.ArticleLikeResponse;
import com.sweet.home.article.service.ArticleLikeService;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/articles/{articleId}/likes")
    public ResponseEntity<Void> likeArticle(@AuthenticationPrincipal String email, @PathVariable Long articleId) {
        articleLikeService.likeArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/articles/likes")
    public ResponseEntity<List<ArticleLikeResponse>> showArticleLikes(@AuthenticationPrincipal String email, @PageableDefault
        Pageable pageable) {
        return ResponseEntity.ok().body(articleLikeService.showArticleLikes(email, pageable));
    }

    @DeleteMapping("/articles/{articleId}/likes")
    public ResponseEntity<Void> deleteLike(@AuthenticationPrincipal String email, @PathVariable Long articleId) {
        articleLikeService.deleteLike(email, articleId);
        return ResponseEntity.noContent().build();
    }
}