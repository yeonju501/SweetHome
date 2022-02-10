package com.sweet.home.article.controller;

import com.sweet.home.article.controller.dto.response.ArticleReportDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleReportsResponse;
import com.sweet.home.article.service.ArticleDeleteService;
import com.sweet.home.article.service.ArticleReportService;
import com.sweet.home.article.service.ArticleService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArticleReportRestController {

    private final ArticleReportService articleReportService;
    private final ArticleService articleService;
    private final ArticleDeleteService articleDeleteService;

    public ArticleReportRestController(ArticleReportService articleReportService,
        ArticleService articleService, ArticleDeleteService articleDeleteService) {
        this.articleReportService = articleReportService;
        this.articleService = articleService;
        this.articleDeleteService = articleDeleteService;
    }

    @PostMapping("/articles/{articleId}/reports")
    public ResponseEntity<Void> reportArticle(@AuthenticationPrincipal String email, @PathVariable Long articleId, @RequestBody
        ReportSaveRequest request) {
        articleReportService.reportArticle(email, articleId, request);
        articleService.checkReportCounts(articleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/articles/reports")
    public ResponseEntity<ArticleReportsResponse> showBlockedArticles(
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(articleService.showBlockedArticles(pageable));
    }

    @GetMapping("/admin/articles/{articleId}/reports")
    public ResponseEntity<List<ArticleReportDetailResponse>> showReports(@PathVariable Long articleId) {
        return ResponseEntity.ok().body(articleReportService.showReports(articleId));
    }

    @PostMapping("/admin/articles/{articleId}/reports")
    public ResponseEntity<Void> approveReports(@PathVariable Long articleId) {
        articleDeleteService.cascadeDeleteArticle(articleId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/admin/articles/{articleId}/reports")
    public ResponseEntity<Void> disapproveReports(@PathVariable Long articleId) {
        articleReportService.deleteAllByArticle(articleId);
        articleService.unblockArticle(articleId);
        return ResponseEntity.noContent().build();
    }
}
