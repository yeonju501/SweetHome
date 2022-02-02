package com.sweet.home.message.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;

@Getter
public class MessageDeleteRequest {

    @JsonProperty("message_ids")
    private List<Long> ids;
}
