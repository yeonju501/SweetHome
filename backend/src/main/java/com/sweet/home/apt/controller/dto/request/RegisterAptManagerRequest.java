package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterAptManagerRequest {

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

    @JsonProperty("message")
    private String message;

    public RegisterAptManagerRequest() {
    }

    public RegisterAptManagerRequest(String sidoName, String gunguName, String dongName, String roadName,
        Integer roadAptNum, String aptNumber, String zipCode, String aptName, String message) {
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.roadAptNum = roadAptNum;
        this.aptNumber = aptNumber;
        this.zipCode = zipCode;
        this.aptName = aptName;
        this.message = message;
    }
}
