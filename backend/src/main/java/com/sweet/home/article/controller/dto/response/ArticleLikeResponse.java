package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.ArticleLike;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleLikeResponse {

    @JsonProperty("board_name")
    private String boardName;

    @JsonProperty("title")
    private String title;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleLikeResponse() {
    }

    public ArticleLikeResponse(String boardName, String title, LocalDateTime createdAt) {
        this.boardName = boardName;
        this.title = title;
        this.createdAt = createdAt;
    }

    public static ArticleLikeResponse from(ArticleLike articleLike) {
        return new ArticleLikeResponse(
            articleLike.getArticle().getBoard().getName(),
            articleLike.getArticle().getTitle(),
            articleLike.getArticle().getCreatedAt()
        );
    }
}
