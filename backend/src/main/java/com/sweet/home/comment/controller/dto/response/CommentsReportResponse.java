package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.Comment;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class CommentsReportResponse {

    @JsonProperty("blocked_comments")
    private List<CommentReportResponse> comments;

    @JsonProperty("total_page_count")
    private int total_page_count;

    @JsonProperty("current_page_count")
    private int current_page_count;

    protected CommentsReportResponse() {

    }

    public CommentsReportResponse(List<CommentReportResponse> comments, int total_page_count, int current_page_count) {
        this.comments = comments;
        this.total_page_count = total_page_count;
        this.current_page_count = current_page_count;
    }

    public static CommentsReportResponse from(Page<Comment> comments) {
        return new CommentsReportResponse(
            comments.stream()
                .map(CommentReportResponse::from)
                .collect(Collectors.toList()),
            comments.getTotalPages(),
            comments.getNumber()
        );
    }
}
