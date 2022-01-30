package com.sweet.home.comment.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CommentSaveRequest {

    @JsonProperty("content")
    private String content;

    protected CommentSaveRequest() {
    }

    public CommentSaveRequest(String content) {
        this.content = content;
    }
}
