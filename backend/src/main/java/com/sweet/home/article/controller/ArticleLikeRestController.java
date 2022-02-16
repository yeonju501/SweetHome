package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.response.ArticlesLikeResponse;
import com.sweet.home.article.controller.dto.response.LikeStatusResponse;
import com.sweet.home.article.service.ArticleLikeService;
import com.sweet.home.global.aop.AptChecker;
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
@RequestMapping("/api/apts")
public class ArticleLikeRestController {

    private final ArticleLikeService articleLikeService;

    public ArticleLikeRestController(ArticleLikeService articleLikeService) {
        this.articleLikeService = articleLikeService;
    }

    @AptChecker
    @PostMapping("/{aptId}/articles/{articleId}/likes")
    public ResponseEntity<Void> likeArticle(@AuthenticationPrincipal String email, @PathVariable Long aptId, @PathVariable Long articleId) {
        articleLikeService.likeArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @GetMapping("/{aptId}/articles/{articleId}/likes")
    public ResponseEntity<LikeStatusResponse> showArticleLikeStatus(@AuthenticationPrincipal String email, @PathVariable Long aptId, @PathVariable Long articleId) {
        return ResponseEntity.ok().body(new LikeStatusResponse(articleLikeService.showArticleLikeStatus(email, articleId)));
    }

    @AptChecker
    @GetMapping("/{aptId}/articles/likes/mine")
    public ResponseEntity<ArticlesLikeResponse> showMyArticleLikes(@AuthenticationPrincipal String email, @PathVariable Long aptId, @PageableDefault
        Pageable pageable) {
        return ResponseEntity.ok().body(articleLikeService.showArticleLikes(email, pageable));
    }

    @AptChecker
    @DeleteMapping("/{aptId}/articles/{articleId}/likes")
    public ResponseEntity<Void> deleteLike(@AuthenticationPrincipal String email, @PathVariable Long aptId, @PathVariable Long articleId) {
        articleLikeService.deleteLike(email, articleId);
        return ResponseEntity.noContent().build();
    }
}