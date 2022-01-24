package com.sweet.home.message.controller;

import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class MessageRestController {

    private final MessageService messageService;

    public MessageRestController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/message/send")
    public ResponseEntity<Void> send(@RequestBody MessageSendRequest request) {
        Long messageId = messageService.sendMessage(request);
        URI uri = URI.create("/api/message/" + messageId);
        return ResponseEntity.created(uri).build();
    }

}
