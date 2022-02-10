package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.ArticleReport;
import lombok.Getter;

@Getter
public class ArticleReportDetailResponse {

    @JsonProperty("report_id")
    private Long id;

    @JsonProperty("report_username")
    private String username;

    @JsonProperty("content")
    private String content;

    protected ArticleReportDetailResponse() {

    }

    public ArticleReportDetailResponse(Long id, String username, String content) {
        this.id = id;
        this.username = username;
        this.content = content;
    }

    public static ArticleReportDetailResponse from(ArticleReport report) {
        return new ArticleReportDetailResponse(
            report.getId(),
            report.getMember().getUsername(),
            report.getContent()
        );
    }
}
