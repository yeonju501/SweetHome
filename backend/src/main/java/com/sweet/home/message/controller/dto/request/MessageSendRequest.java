package com.sweet.home.message.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.message.domain.MessageContent;
import lombok.Getter;

@Getter
public class MessageSendRequest {

    @JsonProperty("receiver_name")
    private String receiverName;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    public MessageSendRequest() {
    }

    public MessageSendRequest(String receiverName, String title, String content) {
        this.receiverName = receiverName;
        this.title = title;
        this.content = content;
    }

    public MessageContent toCreateMessageContent() {
        return MessageContent.createMessageContent(title, content);
    }
}
