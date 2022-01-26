package com.sweet.home.message.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MessageDetailResponse {
    @JsonProperty("sender_username")
    private String senderUsername;

    @JsonProperty("sender_email")
    private String senderEmail;

    @JsonProperty("receiver_username")
    private String receiverUsername;

    @JsonProperty("receiver_email")
    private String receiverEmail;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    @JsonProperty("send_at")
    private String sendAt;

    @JsonProperty("read_at")
    private String readAt;

    public MessageDetailResponse() {
    }

    public MessageDetailResponse(String senderUsername, String senderEmail, String receiverUsername, String receiverEmail,
        String title, String content, String sendAt, String readAt) {
        this.senderUsername = senderUsername;
        this.senderEmail = senderEmail;
        this.receiverUsername = receiverUsername;
        this.receiverEmail = receiverEmail;
        this.title = title;
        this.content = content;
        this.sendAt = sendAt;
        this.readAt = readAt;
    }
}
