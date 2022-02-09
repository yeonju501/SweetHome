package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterAptManagerRequest {

    @JsonProperty("apt_id")
    private Long aptId;

    @JsonProperty("message")
    private String message;

    public RegisterAptManagerRequest() {
    }

    public RegisterAptManagerRequest(Long aptId, String message) {
        this.aptId = aptId;
        this.message = message;
    }
}
