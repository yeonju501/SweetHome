package com.sweet.home.apt.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AptHouseMemberRequest {

    @JsonProperty("apt_house_member_id")
    private Long id;

    public AptHouseMemberRequest() {
    }

    public AptHouseMemberRequest(Long id) {
        this.id = id;
    }
}
