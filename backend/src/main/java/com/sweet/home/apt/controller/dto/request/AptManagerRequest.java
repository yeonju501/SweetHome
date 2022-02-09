package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AptManagerRequest {

    @JsonProperty("member_id")
    private Long memberId;

    public AptManagerRequest() {
    }

    public AptManagerRequest(Long memberId) {
        this.memberId = memberId;
    }
}
