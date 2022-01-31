package com.sweet.home.reply.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ReplySaveRequest {

    @JsonProperty("content")
    private String content;

    protected ReplySaveRequest() {
    }
}
