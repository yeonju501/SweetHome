package com.sweet.home.message.controller;

import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.service.MessageService;
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

    @DeleteMapping("/messages/send/{message_id}")
    public ResponseEntity<Void> deleteSendMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "message_id") String messageId) {
        messageService.deleteSendMessage(email, messageId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/messages/receive/{message_id}")
    public ResponseEntity<Void> deleteReceiveMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "message_id") String messageId) {
        messageService.deleteReceiveMessage(email, messageId);
        return ResponseEntity.noContent().build();
    }
}
