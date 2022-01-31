package com.sweet.home.reply.controller;

import com.sweet.home.reply.controller.dto.request.ReplySaveRequest;
import com.sweet.home.reply.service.ReplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class ReplyRestController {

    private final ReplyService replyService;

    public ReplyRestController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/{commentId}/replies")
    public ResponseEntity<Void> createReply(@AuthenticationPrincipal String email, @PathVariable Long commentId, @RequestBody
        ReplySaveRequest request) {
        replyService.createReply(email, commentId, request);
        return ResponseEntity.noContent().build();
    }

}
