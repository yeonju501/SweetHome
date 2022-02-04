package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleReportResponse {

    @JsonProperty("totalReports")
    private int totalReports;

    @JsonProperty("id")
    private Long id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("username")
    private String username;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleReportResponse() {

    }

    public ArticleReportResponse(int totalReports, Long id, String title, String username, LocalDateTime createdAt) {
        this.totalReports = totalReports;
        this.id = id;
        this.title = title;
        this.username = username;
        this.createdAt = createdAt;
    }

    public static ArticleReportResponse from(Article article) {
        return new ArticleReportResponse(
            article.getTotalReports(),
            article.getId(),
            article.getTitle(),
            article.getMember().getUsername(),
            article.getCreatedAt()
        );
    }
}
