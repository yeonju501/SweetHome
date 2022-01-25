package com.sweet.home.board.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.board.domain.Board;
import lombok.Getter;

@Getter
public class BoardResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    protected BoardResponse() {
    }

    public BoardResponse(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static BoardResponse from(Board board){
        return new BoardResponse(
            board.getId(),
            board.getName(),
            board.getDescription()
        );
    }
}
