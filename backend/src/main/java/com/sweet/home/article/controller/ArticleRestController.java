package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.response.ArticleResponse;
import com.sweet.home.article.service.ArticleService;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<List<ArticleResponse>> showArticleList(@PathVariable Long boardId) {
        return ResponseEntity.ok().body(articleService.findAllByBoard(boardId));
    }
}
