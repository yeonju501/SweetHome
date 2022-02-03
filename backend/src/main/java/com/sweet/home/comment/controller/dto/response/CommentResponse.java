package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.util.List;
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

    @JsonProperty("total_likes")
    private long totalLikes;

    @JsonProperty("replies")
    private List<CommentReplyResponse> replies;

    protected CommentResponse() {
    }

    public CommentResponse(Long id, String username, String content, long totalLikes, List<CommentReplyResponse> replies) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.totalLikes = totalLikes;
        this.replies = replies;
    }

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
            comment.getId(),
            comment.getMember().getUsername(),
            comment.getContent(),
            comment.getTotalLikes(),
            comment.getChildList().stream().map(CommentReplyResponse::from).collect(Collectors.toList())
        );
    }
}