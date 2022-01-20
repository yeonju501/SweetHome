package com.sweet.home.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;
import lombok.Getter;

@Getter
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

    public MemberSaveRequest(String email, String password, String username, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
    }

    public Member toAssociateMember() {
        return Member.createAssociateMember(email, password, username, phoneNumber);
    }
}
