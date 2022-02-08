package com.sweet.home.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UnreadCountResponse {

    @JsonProperty("unread_count")
    private Long unreadCount;

    public UnreadCountResponse() {
    }

    public UnreadCountResponse(Long unreadCount) {
        this.unreadCount = unreadCount;
    }

    public static UnreadCountResponse from(Long unreadCount) {
        return new UnreadCountResponse(unreadCount);
    }
}
