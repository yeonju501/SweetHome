package com.sweet.home.comment.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;

@Getter
public class CommentsDeleteRequest {

    @JsonProperty("ids")
    public List<Long> ids;

}
