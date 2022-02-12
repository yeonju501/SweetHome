package com.sweet.home.apt.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.apt.domain.RegisterAptManager;

public class RegisterAptManagerResponse {

    @JsonProperty("member_id")
    private Long memberId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("message")
    private String message;

    @JsonProperty("apt_id")
    private Long apt_id;

    @JsonProperty("apt_number")
    private String aptNumber;

    @JsonProperty("sido_name")
    private String sidoName;

    @JsonProperty("gungu_name")
    private String gunguName;

    @JsonProperty("dong_name")
    private String dongName;

    @JsonProperty("road_name")
    private String roadName;

    @JsonProperty("road_apt_num")
    private Integer roadAptNum;

    @JsonProperty("zip_code")
    private String zipCode;

    @JsonProperty("apt_name")
    private String aptName;

    public RegisterAptManagerResponse() {
    }

    public RegisterAptManagerResponse(Long memberId, String name, String email, String phoneNumber, String message,
        Long apt_id, String aptNumber, String sidoName, String gunguName, String dongName, String roadName,
        Integer roadAptNum, String zipCode, String aptName) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.message = message;
        this.apt_id = apt_id;
        this.aptNumber = aptNumber;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.zipCode = zipCode;
        this.aptName = aptName;
    }

    public static RegisterAptManagerResponse from(RegisterAptManager registerAptManager) {
        return new RegisterAptManagerResponse(
            registerAptManager.getMember().getId(),
            registerAptManager.getMember().getUsername(),
            registerAptManager.getMember().getEmail(),
            registerAptManager.getMember().getPhoneNumber(),
            registerAptManager.getMessage(),
            registerAptManager.getApt() == null ? null : registerAptManager.getApt().getId(),
            registerAptManager.getAptNumber(),
            registerAptManager.getSidoName(),
            registerAptManager.getGunguName(),
            registerAptManager.getDongName(),
            registerAptManager.getRoadName(),
            registerAptManager.getRoadAptNum(),
            registerAptManager.getZipCode(),
            registerAptManager.getAptName()
        );
    }
}
