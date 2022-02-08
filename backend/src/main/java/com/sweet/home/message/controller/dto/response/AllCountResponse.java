package com.sweet.home.message.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AllCountResponse {

    @JsonProperty("all_count")
    private Long allCount;

    public AllCountResponse() {
    }

    public AllCountResponse(Long allCount) {
        this.allCount = allCount;
    }

    public static AllCountResponse from(Long allCount) {
        return new AllCountResponse(allCount);
    }
}
