package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleLike;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ArticlesLikeResponse {

    @JsonProperty("articles")
    private List<ArticleLikeResponse> articles;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    protected ArticlesLikeResponse() {

    }

    public ArticlesLikeResponse(List<ArticleLikeResponse> articles, int totalPageCount, int currentPageCount) {
        this.articles = articles;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ArticlesLikeResponse from(Page<ArticleLike> articleLikes) {
        return new ArticlesLikeResponse(
            articleLikes.stream()
                .map(ArticleLikeResponse::from)
                .collect(Collectors.toList()),
            articleLikes.getTotalPages(),
            articleLikes.getNumber()
        );
    }

    public static ArticlesLikeResponse fromArticle(Page<Article> articles) {
        return new ArticlesLikeResponse(
            articles.stream()
                .map(ArticleLikeResponse::from)
                .collect(Collectors.toList()),
            articles.getTotalPages(),
            articles.getNumber()
        );
    }
}
