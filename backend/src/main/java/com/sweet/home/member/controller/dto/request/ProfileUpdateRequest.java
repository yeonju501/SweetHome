package com.sweet.home.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ProfileUpdateRequest {

    @JsonProperty("password")
    private String password;

    @JsonProperty("username")
    private String username;

    @JsonProperty("phone_number")
    private String phoneNumeber;

    public ProfileUpdateRequest() {
    }

    public ProfileUpdateRequest(String password, String username, String phoneNumeber) {
        this.password = password;
        this.username = username;
        this.phoneNumeber = phoneNumeber;
    }
}
