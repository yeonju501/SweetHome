package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class CommentReplyResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("parent_id")
    private Long parentId;

    @JsonProperty("username")
    private String username;

    @JsonProperty("content")
    private String content;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonFormat
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @JsonProperty("total_likes")
    private int totalLikes;

    protected CommentReplyResponse() {
    }

    public CommentReplyResponse(Long id, Long parentId, String username, String content, LocalDateTime createdAt,
        LocalDateTime updatedAt, int totalLikes) {
        this.id = id;
        this.parentId = parentId;
        this.username = username;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
    }

    public static CommentReplyResponse from(Comment comment) {
        return new CommentReplyResponse(
            comment.getId(),
            comment.getParent().getId(),
            comment.getMember().getUsername(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getTotalLikes()
        );
    }
}
