package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.member.domain.Member;

public class AptMemberResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    public AptMemberResponse() {
    }

    public AptMemberResponse(Long id, String name, String email, String phoneNumber, String dong, String ho) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dong = dong;
        this.ho = ho;
    }

    public static AptMemberResponse from(Member member) {
        return new AptMemberResponse(
            member.getId(),
            member.getUsername(),
            member.getEmail(),
            member.getPhoneNumber(),
            member.getAptHouse().getDong(),
            member.getAptHouse().getHo()
        );
    }
}
