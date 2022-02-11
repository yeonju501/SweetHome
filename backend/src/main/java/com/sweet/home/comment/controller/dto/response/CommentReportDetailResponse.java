package com.sweet.home.comment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.comment.domain.CommentReport;
import lombok.Getter;

@Getter
public class CommentReportDetailResponse {

    @JsonProperty("report_id")
    private Long id;

    @JsonProperty("report_username")
    private String username;

    @JsonProperty("content")
    private String content;

    protected CommentReportDetailResponse() {

    }

    public CommentReportDetailResponse(Long id, String username, String content) {
        this.id = id;
        this.username = username;
        this.content = content;
    }

    public static CommentReportDetailResponse from(CommentReport commentReport){
        return new CommentReportDetailResponse(
            commentReport.getId(),
            commentReport.getMember().getUsername(),
            commentReport.getContent()
        );
    }
}
