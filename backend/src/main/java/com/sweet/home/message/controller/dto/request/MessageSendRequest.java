package com.sweet.home.message.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.message.domain.MessageContent;
import lombok.Getter;

@Getter
public class MessageSendRequest {

    @JsonProperty("receiver")
    private String receiver;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    public MessageSendRequest() {
    }

    public MessageSendRequest(String receiver, String title, String content) {
        this.receiver = receiver;
        this.title = title;
        this.content = content;
    }

    public MessageContent toCreateMessageContent() {
        return MessageContent.createMessageContent(title, content);
    }
}
