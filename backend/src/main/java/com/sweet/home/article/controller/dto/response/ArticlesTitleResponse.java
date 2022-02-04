package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ArticlesTitleResponse {

    @JsonProperty("articles")
    private List<ArticleTitleResponse> articles;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public ArticlesTitleResponse() {

    }

    public ArticlesTitleResponse(List<ArticleTitleResponse> articles, int totalPageCount, int currentPageCount) {
        this.articles = articles;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ArticlesTitleResponse from(Page<Article> articles) {
        return new ArticlesTitleResponse(
            articles.stream()
                .map(ArticleTitleResponse::from)
                .collect(Collectors.toList()),
            articles.getTotalPages(),
            articles.getNumber()
        );
    }
}
