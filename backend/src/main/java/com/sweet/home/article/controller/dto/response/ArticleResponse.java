package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("member")
    private MemberArticleResponse member;

    @JsonProperty("content")
    private String content;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, MemberArticleResponse member, String content, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.member = member;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
            article.getId(),
            article.getTitle(),
            MemberArticleResponse.from(article.getMember()),
            article.getContent(),
            article.getCreatedAt()
        );
    }
}
