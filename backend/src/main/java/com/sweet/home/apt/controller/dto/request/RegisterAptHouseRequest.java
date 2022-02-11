package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterAptHouseRequest {

    @JsonProperty("apt_number")
    private String aptNumber;

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    @JsonProperty("message")
    private String message;

    public RegisterAptHouseRequest() {
    }

    public RegisterAptHouseRequest(String aptNumber, String dong, String ho, String message) {
        this.aptNumber = aptNumber;
        this.dong = dong;
        this.ho = ho;
        this.message = message;
    }
}
