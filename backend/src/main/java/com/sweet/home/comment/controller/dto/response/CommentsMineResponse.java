package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class CommentsMineResponse {

    @JsonProperty("comments")
    private List<CommentMineResponse> comments;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    protected CommentsMineResponse() {

    }

    public CommentsMineResponse(List<CommentMineResponse> comments, int totalPageCount, int currentPageCount) {
        this.comments = comments;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static CommentsMineResponse from(Page<Comment> comments) {
        return new CommentsMineResponse(comments.stream()
            .map(CommentMineResponse::from)
            .collect(Collectors.toList()),
            comments.getTotalPages(),
            comments.getNumber()
        );
    }
}
