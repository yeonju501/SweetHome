package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleTitleResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("username")
    private String username;

    @JsonProperty("user_image")
    private String user_image;

    @JsonProperty("content")
    private String content;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("total_likes")
    private int totalLikes;

    @JsonProperty("total_replies")
    private int totalReplies;

    @JsonProperty("total_reports")
    private int totalReports;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    protected ArticleTitleResponse() {
    }

    public ArticleTitleResponse(Long id, String title, String username, String user_image, String content, String imageUrl,
        int totalLikes, int totalReplies, int totalReports, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.user_image = user_image;
        this.content = content;
        this.imageUrl = imageUrl;
        this.totalLikes = totalLikes;
        this.totalReplies = totalReplies;
        this.totalReports = totalReports;
        this.createdAt = createdAt;
    }

    public static ArticleTitleResponse from(Article article) {
        return new ArticleTitleResponse(
            article.getId(),
            article.getTitle(),
            article.getMember().getUsername(),
            article.getMember().getImageUrl(),
            article.getContent(),
            article.getImageUrl(),
            article.getTotalLikes(),
            article.getTotalReplies(),
            article.getTotalReports(),
            article.getCreatedAt()
        );
    }
}
