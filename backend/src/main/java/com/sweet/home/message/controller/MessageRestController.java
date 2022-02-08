package com.sweet.home.message.controller;

import com.sweet.home.message.controller.dto.response.AllCountResponse;
import com.sweet.home.message.controller.dto.response.CountsResponse;
import com.sweet.home.message.controller.dto.response.UnreadCountResponse;
import com.sweet.home.message.controller.dto.request.MessageDeleteRequest;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.controller.dto.response.MessageDetailResponse;
import com.sweet.home.message.controller.dto.response.MessagesResponse;
import com.sweet.home.message.service.MessageService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

    @DeleteMapping("/messages/send")
    public ResponseEntity<Void> deleteSendMessages(@AuthenticationPrincipal String email,
        @RequestBody MessageDeleteRequest request) {
        messageService.deleteSendMessages(email, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/messages/receive")
    public ResponseEntity<Void> deleteReceiveMessages(@AuthenticationPrincipal String email,
        @RequestBody MessageDeleteRequest request) {
        messageService.deleteReceiveMessages(email, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/messages/{message_id}")
    public ResponseEntity<MessageDetailResponse> getDetailMessage(@AuthenticationPrincipal String email,
        @PathVariable(value = "message_id") Long messageId) {
        return ResponseEntity.ok().body(messageService.viewMessageDetail(email, messageId));
    }

    @GetMapping("/messages/send")
    public ResponseEntity<MessagesResponse> getSendMessages(@AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(messageService.viewSendMessages(pageable, email));
    }

    @GetMapping("/messages/receive")
    public ResponseEntity<MessagesResponse> getReceiveMessages(@AuthenticationPrincipal String email,
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(messageService.viewReceiveMessages(pageable, email));
    }

    @GetMapping("messages/receive/unread-count")
    public ResponseEntity<UnreadCountResponse> getUnreadReceiveMessagesCount(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(messageService.getUnreadReceiveMessagesCount(email));
    }

    @GetMapping("messages/receive/all-count")
    public ResponseEntity<AllCountResponse> getAllReceiveMessagesCount(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(messageService.getAllReceiveMessagesCount(email));
    }

    @GetMapping("messages/receive/counts")
    public ResponseEntity<CountsResponse> getReceiveMessagesCounts(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(messageService.getReceiveMessagesCounts(email));
    }

    @GetMapping("messages/send/all-count")
    public ResponseEntity<AllCountResponse> getAllSendMessagesCount(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(messageService.getAllSendMessagesCount(email));
    }
}
