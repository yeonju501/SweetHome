package com.sweet.home.global.exception;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorResponse {
    @JsonProperty("error_code")
    private String errorCode;

    public ErrorResponse() {
    }

    public ErrorResponse(String errorCode) {
        this.errorCode = errorCode;
    }

    public static ErrorResponse from(ErrorCode errorCode){
        return new ErrorResponse(errorCode.getCode());
    }
}
