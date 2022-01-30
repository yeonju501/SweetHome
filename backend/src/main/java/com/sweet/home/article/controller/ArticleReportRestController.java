package com.sweet.home.article.controller;

import com.sweet.home.article.service.ArticleReportService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
public class ArticleReportRestController {

    private final ArticleReportService articleReportService;

    public ArticleReportRestController(ArticleReportService articleReportService) {
        this.articleReportService = articleReportService;
    }

    @PostMapping("/{articleId}/reports")
    public ResponseEntity<Void> reportArticle(@AuthenticationPrincipal String email, @PathVariable Long articleId, @RequestBody
        ReportSaveRequest request) {
        articleReportService.reportArticle(email, articleId, request);
        return ResponseEntity.noContent().build();
    }
}
