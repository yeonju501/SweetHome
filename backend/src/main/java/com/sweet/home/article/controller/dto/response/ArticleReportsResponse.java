package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ArticleReportsResponse {

    @JsonProperty("articles")
    private List<ArticleReportResponse> articles;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    protected ArticleReportsResponse() {

    }

    public ArticleReportsResponse(List<ArticleReportResponse> articles, int totalPageCount, int currentPageCount) {
        this.articles = articles;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ArticleReportsResponse from(Page<Article> articles) {
        return new ArticleReportsResponse(
            articles.stream()
                .map(ArticleReportResponse::from)
                .collect(Collectors.toList()),
            articles.getTotalPages(),
            articles.getNumber()
        );
    }

}
