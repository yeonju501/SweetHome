package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.response.ArticleDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticlesLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticlesTitleResponse;
import com.sweet.home.article.service.ArticleDeleteService;
import com.sweet.home.article.service.ArticleService;
import java.net.URI;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final ArticleDeleteService articleDeleteService;

    public ArticleRestController(ArticleService articleService,
        ArticleDeleteService articleDeleteService) {
        this.articleService = articleService;
        this.articleDeleteService = articleDeleteService;
    }

    @PostMapping("/{boardId}/articles")
    public ResponseEntity<Void> createArticle(@AuthenticationPrincipal String email, @RequestBody ArticleSaveRequest request,
        @PathVariable Long boardId) {
        Long createArticleId = articleService.saveArticle(email, request, boardId);
        URI uri = URI.create("/" + boardId + "/articles/" + createArticleId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/articles/{articleId}")
    public ResponseEntity<ArticleDetailResponse> showArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok().body(articleService.showArticle(articleId));
    }

    @GetMapping("/{boardId}/articles")
    public ResponseEntity<ArticlesTitleResponse> showArticlesByBoard(@PathVariable Long boardId,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showArticlesByBoard(boardId, pageable));
    }

    @GetMapping("/articles/mine")
    public ResponseEntity<ArticlesLikeResponse> showMyArticles(@AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showMyArticles(email, pageable));
    }

    @GetMapping("/articles/popular")
    public ResponseEntity<List<ArticleLikeResponse>> showPopularArticles(
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showPopularArticles(pageable));
    }

    @PutMapping("/articles/{articleId}")
    public ResponseEntity<Void> updateArticle(@AuthenticationPrincipal String email, @RequestBody ArticleSaveRequest request,
        @PathVariable Long articleId) {
        articleService.updateArticle(email, request, articleId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity<Void> deleteArticle(@AuthenticationPrincipal String email, @PathVariable Long articleId) {
        articleDeleteService.deleteArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }
}
