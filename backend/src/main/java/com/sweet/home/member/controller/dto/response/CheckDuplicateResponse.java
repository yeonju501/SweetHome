package com.sweet.home.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CheckDuplicateResponse {

    @JsonProperty("result")
    private Boolean result;

    public CheckDuplicateResponse() {
    }

    public CheckDuplicateResponse(Boolean result) {
        this.result = result;
    }

    public static CheckDuplicateResponse from(Boolean result) {
        return new CheckDuplicateResponse(
            result
        );
    }
}
