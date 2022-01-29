package com.sweet.home.auth.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.auth.domain.Tokens;
import lombok.Getter;

@Getter
public class LoginMemberResponse {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;

    public LoginMemberResponse() {
    }

    public LoginMemberResponse(Tokens tokens) {
        this.accessToken = tokens.getAccessToken();
        this.refreshToken = tokens.getRefreshToken();
    }
}
