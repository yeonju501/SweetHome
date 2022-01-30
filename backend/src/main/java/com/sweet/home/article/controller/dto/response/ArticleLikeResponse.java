package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.ArticleLike;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleLikeResponse {

    @JsonProperty("member")
    private MemberArticleResponse member;

    @JsonProperty("article")
    private ArticleTitleResponse article;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleLikeResponse() {
    }

    public ArticleLikeResponse(MemberArticleResponse member, ArticleTitleResponse article, LocalDateTime createdAt) {
        this.member = member;
        this.article = article;
        this.createdAt = createdAt;
    }

    public static ArticleLikeResponse from(ArticleLike articleLike) {
        return new ArticleLikeResponse(
            MemberArticleResponse.from(articleLike.getMember()),
            ArticleTitleResponse.from(articleLike.getArticle()),
            articleLike.getCreatedAt()
        );
    }
}
