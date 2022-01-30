package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.response.ArticleDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleTitleResponse;
import com.sweet.home.article.service.ArticleService;
import java.net.URI;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boards")
public class ArticleRestController {

    private final ArticleService articleService;

    public ArticleRestController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/{boardId}/articles")
    public ResponseEntity<Void> createArticle(@AuthenticationPrincipal String email, @RequestBody ArticleSaveRequest request,
        @PathVariable Long boardId) {
        Long createArticleId = articleService.saveArticle(email, request, boardId);
        URI uri = URI.create("/" + boardId + "/articles/" + createArticleId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{boardId}/articles")
    public ResponseEntity<List<ArticleTitleResponse>> showArticles(@PathVariable Long boardId,
        @PageableDefault Pageable pageable) {
        articleService.findAllByBoard(boardId, pageable);
        return ResponseEntity.ok().body(articleService.findAllByBoard(boardId, pageable));
    }

    @GetMapping("/articles/{articleId}")
    public ResponseEntity<ArticleDetailResponse> showArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok().body(articleService.showArticle(articleId));
    }

    @PutMapping("/articles/{articleId}")
    public ResponseEntity<Void> updateArticle(@AuthenticationPrincipal String email, @RequestBody ArticleSaveRequest request,
        @PathVariable Long articleId) {
        articleService.updateArticle(email, request, articleId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity<Void> deleteArticle(@AuthenticationPrincipal String email, @PathVariable Long articleId) {
        articleService.deleteArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }
}
