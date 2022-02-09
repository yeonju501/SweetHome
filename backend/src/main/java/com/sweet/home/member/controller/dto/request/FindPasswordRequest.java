package com.sweet.home.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class FindPasswordRequest {

    @JsonProperty("email")
    private String email;

    public FindPasswordRequest() {
    }

    public FindPasswordRequest(String email) {
        this.email = email;
    }
}
