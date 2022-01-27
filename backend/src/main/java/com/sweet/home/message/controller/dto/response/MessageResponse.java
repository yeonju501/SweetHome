package com.sweet.home.message.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.message.domain.Message;
import java.time.LocalDateTime;

public class MessageResponse {

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

    @JsonProperty("send_at")
    private LocalDateTime sendAt;

    @JsonProperty("read_at")
    private LocalDateTime readAt;

    public MessageResponse() {
    }

    public MessageResponse(String senderUsername, String senderEmail, String receiverUsername, String receiverEmail,
        String title, LocalDateTime sendAt, LocalDateTime readAt) {
        this.senderUsername = senderUsername;
        this.senderEmail = senderEmail;
        this.receiverUsername = receiverUsername;
        this.receiverEmail = receiverEmail;
        this.title = title;
        this.sendAt = sendAt;
        this.readAt = readAt;
    }

    public static MessageResponse from(Message message) {
        return new MessageResponse(
            message.getSendMember().getUsername(),
            message.getSendMember().getEmail(),
            message.getReceiveMember().getUsername(),
            message.getReceiveMember().getEmail(),
            message.getMessageContent().getTitle(),
            message.getMessageContent().getCreatedAt(),
            message.getMessageContent().getReadAt()
        );
    }
}