package com.sweet.home.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;

public class ProfileResponse {

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("authority")
    private String authority;

    public ProfileResponse() {
    }

    public ProfileResponse(String email, String username, String phoneNumber, String authority) {
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.authority = authority;
    }

    public static ProfileResponse from(Member member) {
        return new ProfileResponse(
            member.getEmail(),
            member.getUsername(),
            member.getPhoneNumber(),
            member.getAuthority().getRole()
        );
    }
}
