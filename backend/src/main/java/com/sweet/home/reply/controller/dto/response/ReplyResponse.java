package com.sweet.home.reply.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.reply.domain.Reply;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ReplyResponse {

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

    protected ReplyResponse() {

    }

    public ReplyResponse(String username, String content, LocalDateTime createdAt, LocalDateTime updatedAt,
        long totalLikes) {
        this.username = username;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalLikes = totalLikes;
    }

    public static ReplyResponse from(Reply reply) {
        return new ReplyResponse(
            reply.getMember().getUsername(),
            reply.getContent(),
            reply.getCreatedAt(),
            reply.getUpdatedAt(),
            reply.getTotalLikes()
        );
    }
}
