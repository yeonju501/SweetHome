package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleDetailResponse {

    @JsonProperty("title")
    private String title;

    @JsonProperty("member")
    private MemberArticleResponse member;

    @JsonProperty("content")
    private String content;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @JsonProperty("total_likes")
    private long totalLikes;

    @JsonProperty("total_reports")
    private long totalReports;

    protected ArticleDetailResponse(String title, MemberArticleResponse member, String content, LocalDateTime createdAt,
        LocalDateTime updatedAt, long totalLikes, long totalReports) {
        this.title = title;
        this.member = member;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
        this.totalReports = totalReports;
    }

    public static ArticleDetailResponse from(Article article) {
        return new ArticleDetailResponse(
            article.getTitle(),
            MemberArticleResponse.from(article.getMember()),
            article.getContent(),
            article.getCreatedAt(),
            article.getUpdatedAt(),
            article.getTotalLikes(),
            article.getTotalReports()
        );
    }
}
