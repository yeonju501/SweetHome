package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.article.domain.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleDetailResponse {

    @JsonProperty("title")
    private String title;

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;

    @JsonProperty("user_image")
    private String userImage;

    @JsonProperty("content")
    private String content;

    @JsonProperty("image_url")
    private String image_url;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonFormat
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @JsonProperty("total_likes")
    private long totalLikes;

    @JsonProperty("total_replies")
    private long totalReplies;

    protected ArticleDetailResponse(String title, String email, String username, String userImage, String content, String image_url,
        LocalDateTime createdAt,
        LocalDateTime updatedAt, long totalLikes, long totalReplies) {
        this.title = title;
        this.email = email;
        this.username = username;
        this.userImage = userImage;
        this.content = content;
        this.image_url = image_url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
        this.totalReplies = totalReplies;
    }

    public static ArticleDetailResponse from(Article article) {
        return new ArticleDetailResponse(
            article.getTitle(),
            article.getMember().getEmail(),
            article.getMember().getUsername(),
            article.getMember().getImageUrl(),
            article.getContent(),
            article.getImageUrl(),
            article.getCreatedAt(),
            article.getUpdatedAt(),
            article.getTotalLikes(),
            article.getTotalReplies()
        );
    }
}
