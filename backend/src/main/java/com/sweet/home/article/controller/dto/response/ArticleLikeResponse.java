package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleLike;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleLikeResponse {

    @JsonProperty("board_id")
    private Long boardId;

    @JsonProperty("board_name")
    private String boardName;

    @JsonProperty("article_id")
    private Long articleId;

    @JsonProperty("title")
    private String title;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleLikeResponse() {
    }

    public ArticleLikeResponse(Long boardId, String boardName, Long articleId, String title, LocalDateTime createdAt) {
        this.boardId = boardId;
        this.boardName = boardName;
        this.articleId = articleId;
        this.title = title;
        this.createdAt = createdAt;
    }

    public static ArticleLikeResponse from(ArticleLike articleLike) {
        return new ArticleLikeResponse(
            articleLike.getArticle().getBoard().getId(),
            articleLike.getArticle().getBoard().getName(),
            articleLike.getArticle().getId(),
            articleLike.getArticle().getTitle(),
            articleLike.getArticle().getCreatedAt()
        );
    }

    public static ArticleLikeResponse from(Article article) {
        return new ArticleLikeResponse(
            article.getBoard().getId(),
            article.getBoard().getName(),
            article.getId(),
            article.getTitle(),
            article.getCreatedAt()
        );
    }
}
