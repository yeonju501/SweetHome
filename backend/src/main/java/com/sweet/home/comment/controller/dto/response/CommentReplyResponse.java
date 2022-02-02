package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import com.sweet.home.reply.controller.dto.response.ReplyResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class CommentReplyResponse {

    @JsonProperty("id")
    private Long id;

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
    private long totalLikes;

    @JsonProperty("replies")
    private List<ReplyResponse> replies;

    protected CommentReplyResponse() {
    }

    public CommentReplyResponse(Long id, String username, String content, LocalDateTime createdAt,
        LocalDateTime updatedAt, long totalLikes, List<ReplyResponse> replies) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
        this.replies = replies;
    }

    public static CommentReplyResponse from(Comment comment) {
        return new CommentReplyResponse(
            comment.getId(),
            comment.getMember().getUsername(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getTotalLikes(),
            comment.getReplies().stream().map(ReplyResponse::from).collect(Collectors.toList())
        );
    }
}