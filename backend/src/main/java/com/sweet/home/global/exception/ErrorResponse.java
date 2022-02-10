package com.sweet.home.global.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ErrorResponse {

    @JsonProperty("error_code")
    private String errorCode;

    public ErrorResponse() {
    }

    public ErrorResponse(String errorCode) {
        this.errorCode = errorCode;
    }

    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.getCode());
    }

    public static String toJson(JwtException e) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(new ErrorResponse(e.getErrorCode().getCode()));
    }

    public static String toJson(ErrorCode error) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(new ErrorResponse(error.getCode()));
    }
}
