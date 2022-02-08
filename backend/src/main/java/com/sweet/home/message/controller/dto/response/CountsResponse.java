package com.sweet.home.message.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CountsResponse {

    @JsonProperty("unread_count")
    private Long unreadCount;

    @JsonProperty("all_count")
    private Long allCount;

    public CountsResponse() {
    }

    public CountsResponse(Long unreadCount, Long allCount) {
        this.unreadCount = unreadCount;
        this.allCount = allCount;
    }

    public static CountsResponse from(Long unreadCount, Long allCount) {
        return new CountsResponse(unreadCount, allCount);
    }
}
