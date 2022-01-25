package com.sweet.home.board.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class BoardSaveRequest {

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    public BoardSaveRequest() {
    }

    public BoardSaveRequest(String name, String description){
        this.name = name;
        this.description = description;
    }

}
