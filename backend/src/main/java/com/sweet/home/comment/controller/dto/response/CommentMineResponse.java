package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class CommentMineResponse {

    @JsonProperty("board_id")
    private Long boardId;

    @JsonProperty("board_name")
    private String boardName;

    @JsonProperty("article_id")
    private Long articleId;

    @JsonProperty("article_title")
    private String articleTitle;

    @JsonProperty("content")
    private String content;

    @JsonFormat
    @JsonProperty("created_at")
    private LocalDateTime created_at;

    @JsonFormat
    @JsonProperty("updated_at")
    private LocalDateTime updated_at;

    protected CommentMineResponse() {
    }

    public CommentMineResponse(Long boardId, String boardName, Long articleId, String articleTitle, String content,
        LocalDateTime created_at, LocalDateTime updated_at) {
        this.boardId = boardId;
        this.boardName = boardName;
        this.articleId = articleId;
        this.articleTitle = articleTitle;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public static CommentMineResponse from(Comment comment) {
        return new CommentMineResponse(
            comment.getArticle().getBoard().getId(),
            comment.getArticle().getBoard().getName(),
            comment.getArticle().getId(),
            comment.getArticle().getTitle(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
        );
    }

}
