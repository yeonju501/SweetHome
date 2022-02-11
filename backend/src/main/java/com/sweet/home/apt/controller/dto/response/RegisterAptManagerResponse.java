package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptManager;

public class RegisterAptManagerResponse {

    @JsonProperty("member_id")
    private Long memberId;

    @JsonProperty("apt_id")
    private Long apt_id;

    @JsonProperty("road_name")
    private String rodaName;

    @JsonProperty("apt_name")
    private String aptName;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("message")
    private String message;

    public RegisterAptManagerResponse() {
    }

    public RegisterAptManagerResponse(Long memberId, Long apt_id, String rodaName, String aptName, String name,
        String email, String phoneNumber, String message) {
        this.memberId = memberId;
        this.apt_id = apt_id;
        this.rodaName = rodaName;
        this.aptName = aptName;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.message = message;
    }

    public static RegisterAptManagerResponse from(RegisterAptManager registerAptManager) {
        return new RegisterAptManagerResponse(
            registerAptManager.getMember().getId(),
            registerAptManager.getApt().getId(),
            registerAptManager.getApt().getRoadName(),
            registerAptManager.getApt().getAptName(),
            registerAptManager.getMember().getUsername(),
            registerAptManager.getMember().getEmail(),
            registerAptManager.getMember().getPhoneNumber(),
            registerAptManager.getMessage()
        );
    }
}
