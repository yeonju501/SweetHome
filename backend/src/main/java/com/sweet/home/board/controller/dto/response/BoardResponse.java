package com.sweet.home.board.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.board.domain.Board;
import com.sweet.home.member.controller.dto.response.ProfileResponse;

public class BoardResponse {

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    protected BoardResponse() {
    }

    public BoardResponse(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public static BoardResponse from(Board board){
        return new BoardResponse(
            board.getName(),
            board.getDescription()
        );
    }
}
