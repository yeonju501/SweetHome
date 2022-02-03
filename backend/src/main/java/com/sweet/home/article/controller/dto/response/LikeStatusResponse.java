package com.sweet.home.article.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LikeStatusResponse {

    @JsonProperty("is_liked")
    private boolean isLiked;

    protected LikeStatusResponse() {

    }

    public LikeStatusResponse(boolean isLiked) {
        this.isLiked = isLiked;
    }
}
