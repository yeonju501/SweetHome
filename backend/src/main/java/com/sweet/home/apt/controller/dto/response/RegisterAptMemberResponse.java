package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptHouse;

public class RegisterAptMemberResponse {

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

    public RegisterAptMemberResponse() {
    }

    public RegisterAptMemberResponse(Long id, String name, String email, String phoneNumber, String dong, String ho) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dong = dong;
        this.ho = ho;
    }

    public static RegisterAptMemberResponse from(RegisterAptHouse registerAptHouse) {
        return new RegisterAptMemberResponse(
            registerAptHouse.getMember().getId(),
            registerAptHouse.getMember().getUsername(),
            registerAptHouse.getMember().getEmail(),
            registerAptHouse.getMember().getPhoneNumber(),
            registerAptHouse.getDong(),
            registerAptHouse.getHo()
        );
    }
}
