package com.sweet.home.message.controller;

import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.controller.dto.response.MessageDetailResponse;
import com.sweet.home.message.controller.dto.response.MessageResponse;
import com.sweet.home.message.service.MessageService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class MessageRestController {

    private final MessageService messageService;

    public MessageRestController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/messages")
    public ResponseEntity<Void> sendMessage(@AuthenticationPrincipal String email, @RequestBody MessageSendRequest request) {
        messageService.sendMessage(email, request);
        URI uri = URI.create("/api/messages/");
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/messages/{message_id}")
    public ResponseEntity<Void> deleteMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "message_id") Long messageId) {
        messageService.deleteMessage(email, messageId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/messages/{message_id}")
    public ResponseEntity<MessageDetailResponse> getDetailMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "message_id") Long messageId) {
        return ResponseEntity.ok().body(messageService.viewMessageDetail(email, messageId));
    }

    @GetMapping("/messages/send")
    public ResponseEntity<List<MessageResponse>> getSendMessageList(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(messageService.viewSendMessageList(email));
    }

    @GetMapping("/messages/receive")
    public ResponseEntity<List<MessageResponse>> getReceiveMessageList(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(messageService.viewReceiveMessageList(email));
    }
}
