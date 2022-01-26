package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.service.ArticleService;
import com.sweet.home.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/boards")
public class ArticleRestController {

    private final ArticleService articleService;

    public ArticleRestController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/{boardId}/articles")
    public ResponseEntity<Void> createArticle(@AuthenticationPrincipal String email, @RequestBody ArticleSaveRequest request, @PathVariable Long boardId) {
        Long createMemberId = articleService.saveArticle(email, request, boardId);
        URI uri = URI.create("/" + boardId + "/articles/" + createMemberId);
        return ResponseEntity.created(uri).build();
    }
}
