package com.sweet.home.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class LoginMemberResponse {

    @JsonProperty("access_token")
    private String accessToken;

    public LoginMemberResponse() {
    }

    public LoginMemberResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
