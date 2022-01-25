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
    public ResponseEntity<Void> send(@AuthenticationPrincipal String email, @RequestBody MessageSendRequest request) {
        messageService.sendMessage(email, request);
        URI uri = URI.create("/api/messages/");
        return ResponseEntity.created(uri).build();
    }
}
