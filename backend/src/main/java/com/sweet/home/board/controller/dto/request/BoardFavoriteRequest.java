package com.sweet.home.board.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class BoardFavoriteRequest {

    @JsonProperty("id")
    private Long id;

    public BoardFavoriteRequest() {
    }

    public BoardFavoriteRequest(Long id) {
        this.id = id;
    }
}
