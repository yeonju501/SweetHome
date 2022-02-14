package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.response.ArticleDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticlesLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticlesTitleResponse;
import com.sweet.home.article.service.ArticleDeleteService;
import com.sweet.home.article.service.ArticleService;
import com.sweet.home.global.aop.AptChecker;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.image.ImageUploader;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/apts")
public class ArticleRestController {

    private final ArticleService articleService;
    private final ArticleDeleteService articleDeleteService;
    private final ImageUploader imageUploader;

    public ArticleRestController(ArticleService articleService,
        ArticleDeleteService articleDeleteService, ImageUploader imageUploader) {
        this.articleService = articleService;
        this.articleDeleteService = articleDeleteService;
        this.imageUploader = imageUploader;
    }

    @AptChecker
    @PostMapping("/{aptId}/boards/{boardId}/articles")
    public ResponseEntity<Void> createArticle(@AuthenticationPrincipal String email, @PathVariable Long aptId,
        @RequestPart(value = "article") ArticleSaveRequest request,
        @RequestPart(value = "image", required = false) MultipartFile file, @PathVariable Long boardId) {
        String url = null;
        if (!file.isEmpty()) {
            try {
                url = imageUploader.upload(file, "article");
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
            }
        }
        Long createArticleId = articleService.saveArticle(email, request, boardId, url);
        URI uri = URI.create("/" + boardId + "/articles/" + createArticleId);
        return ResponseEntity.created(uri).build();
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/articles/{articleId}")
    public ResponseEntity<ArticleDetailResponse> showArticle(@PathVariable Long aptId, @PathVariable Long articleId) {
        return ResponseEntity.ok().body(articleService.showArticle(articleId));
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/{boardId}/articles")
    public ResponseEntity<ArticlesTitleResponse> showArticlesByBoard(@PathVariable Long aptId, @PathVariable Long boardId,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showArticlesByBoard(boardId, pageable));
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/articles/mine")
    public ResponseEntity<ArticlesLikeResponse> showMyArticles(@PathVariable Long aptId, @AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showMyArticles(email, pageable));
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/articles/popular")
    public ResponseEntity<List<ArticleLikeResponse>> showPopularArticles(@PathVariable Long aptId,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showPopularArticles(pageable));
    }

    @AptChecker
    @GetMapping("/{aptId}/boards/articles/new")
    public ResponseEntity<List<ArticleLikeResponse>> showNewArticles(@PathVariable Long aptId,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showNewArticles(pageable));
    }

    @AptChecker
    @PutMapping("/{aptId}/boards/articles/{articleId}")
    public ResponseEntity<Void> updateArticle(@AuthenticationPrincipal String email, @PathVariable Long aptId,
        @RequestPart("article") ArticleSaveRequest request, @RequestPart(value = "image", required = false) MultipartFile file,
        @PathVariable Long articleId) {
        String url = null;
        if (!file.isEmpty()) {
            try {
                url = imageUploader.upload(file, "article");
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
            }
        }
        articleService.updateArticle(email, request, articleId, url);
        return ResponseEntity.noContent().build();
    }

    @AptChecker
    @DeleteMapping("/{aptId}/boards/articles/{articleId}")
    public ResponseEntity<Void> deleteArticle(@AuthenticationPrincipal String email, @PathVariable Long aptId, @PathVariable Long articleId) {
        articleDeleteService.deleteArticle(email, articleId);
        return ResponseEntity.noContent().build();
    }
}
