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

    @JsonProperty("total_likes")
    private long totalLikes;

    protected CommentReplyResponse() {
    }

    public CommentReplyResponse(Long id, Long parentId, String username, String content, long totalLikes) {
        this.id = id;
        this.parentId = parentId;
        this.username = username;
        this.content = content;
        this.totalLikes = totalLikes;
    }

    public static CommentReplyResponse from(Comment comment) {
        return new CommentReplyResponse(
            comment.getId(),
            comment.getParent().getId(),
            comment.getMember().getUsername(),
            comment.getContent(),
            comment.getTotalLikes()
        );
    }
}
