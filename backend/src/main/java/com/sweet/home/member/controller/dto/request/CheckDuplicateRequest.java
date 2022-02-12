package com.sweet.home.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CheckDuplicateRequest {

    @JsonProperty("value")
    private String value;

    public CheckDuplicateRequest() {
    }

    public CheckDuplicateRequest(String value) {
        this.value = value;
    }
}
