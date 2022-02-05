package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class CommentResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("content")
    private String content;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @JsonProperty("total_likes")
    private int totalLikes;

    @JsonProperty("is_removed")
    private Boolean isRemoved;

    @JsonProperty("replies")
    private List<CommentReplyResponse> replies;

    private static final String DELETED_COMMENT_MESSAGE = "[삭제된 댓글입니다.]";

    protected CommentResponse() {
    }

    public CommentResponse(Long id, String username, String content, LocalDateTime createdAt, LocalDateTime updatedAt, int totalLikes, Boolean isRemoved, List<CommentReplyResponse> replies) {
        this.id = id;
        this.username = username;
        this.content = content;
        if (Objects.nonNull(isRemoved)) {
            this.content = DELETED_COMMENT_MESSAGE;
        }
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
        this.isRemoved = isRemoved;
        this.replies = replies;
    }

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
            comment.getId(),
            comment.getMember().getUsername(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getTotalLikes(),
            comment.getIsRemoved(),
            comment.getChildList().stream().map(CommentReplyResponse::from).collect(Collectors.toList())
        );
    }
}