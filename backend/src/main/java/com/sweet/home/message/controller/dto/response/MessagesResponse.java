package com.sweet.home.message.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.message.domain.Message;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public class MessagesResponse {

    @JsonProperty("messages")
    private List<MessageResponse> messageResponse;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    public MessagesResponse() {
    }

    public MessagesResponse(List<MessageResponse> messageResponse, int totalPageCount, int currentPageCount) {
        this.messageResponse = messageResponse;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static MessagesResponse from(Page<Message> messages) {
        return new MessagesResponse(
            messages.stream()
                .map(MessageResponse::from)
                .collect(Collectors.toList()),
            messages.getTotalPages(),
            messages.getNumber()
        );
    }
}
