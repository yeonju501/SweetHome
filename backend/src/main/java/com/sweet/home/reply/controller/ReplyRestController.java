package com.sweet.home.reply.controller;

import com.sun.org.apache.regexp.internal.RE;
import com.sweet.home.reply.controller.dto.request.ReplySaveRequest;
import com.sweet.home.reply.service.ReplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/replies/{replyId}")
    public ResponseEntity<Void> updateReply(@AuthenticationPrincipal String email, @PathVariable Long replyId,
        @RequestBody ReplySaveRequest request) {
        replyService.updateReply(email, replyId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(@AuthenticationPrincipal String email, @PathVariable Long replyId) {
        replyService.deleteReply(email, replyId);
        return ResponseEntity.noContent().build();
    }

}
