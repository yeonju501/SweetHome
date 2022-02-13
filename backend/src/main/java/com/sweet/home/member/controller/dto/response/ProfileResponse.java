package com.sweet.home.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.controller.dto.response.AptHouseResponse;
import com.sweet.home.member.domain.Member;

public class ProfileResponse {

    @JsonProperty("email")
    private String email;

    @JsonProperty("username")
    private String username;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("authority")
    private String authority;

    @JsonProperty("apt_house")
    private AptHouseResponse aptHouseResponse;

    public ProfileResponse() {
    }

    public ProfileResponse(String email, String username, String phoneNumber, String imageUrl, String authority,
        AptHouseResponse aptHouseResponse) {
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.authority = authority;
        this.aptHouseResponse = aptHouseResponse;
    }

    public static ProfileResponse from(Member member) {
        return new ProfileResponse(
            member.getEmail(),
            member.getUsername(),
            member.getPhoneNumber(),
            member.getImageUrl(),
            member.getAuthority().getRole(),
            member.getAptHouse() == null ? null : AptHouseResponse.from(member.getAptHouse())
        );
    }
}
