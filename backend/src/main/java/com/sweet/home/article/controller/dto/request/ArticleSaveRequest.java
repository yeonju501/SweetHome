package com.sweet.home.article.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ArticleSaveRequest {

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    public ArticleSaveRequest() {
    }

    public ArticleSaveRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
