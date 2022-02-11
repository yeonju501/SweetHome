package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterAptManagerRequest {

    @JsonProperty("apt_number")
    private String aptNumber;

    @JsonProperty("message")
    private String message;

    public RegisterAptManagerRequest() {
    }

    public RegisterAptManagerRequest(String aptNumber, String message) {
        this.aptNumber = aptNumber;
        this.message = message;
    }
}
