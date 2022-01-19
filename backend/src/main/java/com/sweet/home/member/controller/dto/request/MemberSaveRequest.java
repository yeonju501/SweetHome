package com.sweet.home.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;

public class MemberSaveRequest {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("username")
    private String username;

    @JsonProperty("phone_number")
    private String phoneNumber;

    public MemberSaveRequest() {
    }

    public Member toEntity() {
        return Member.builder()
            .email(email)
            .password(password)
            .username(username)
            .phoneNumber(phoneNumber)
            .build();
    }
}
