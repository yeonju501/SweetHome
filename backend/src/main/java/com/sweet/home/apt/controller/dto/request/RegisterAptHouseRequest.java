package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterAptHouseRequest {
    @JsonProperty("apt_id")
    private Long aptId;

    @JsonProperty("dong")
    private String dong;

    @JsonProperty("ho")
    private String ho;

    public RegisterAptHouseRequest() {
    }

    public RegisterAptHouseRequest(Long aptId, String dong, String ho) {
        this.aptId = aptId;
        this.dong = dong;
        this.ho = ho;
    }
}
