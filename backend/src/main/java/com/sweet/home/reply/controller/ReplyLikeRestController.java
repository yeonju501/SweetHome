package com.sweet.home.reply.controller;

import com.sweet.home.reply.service.ReplyLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/replies")
public class ReplyLikeRestController {

    private final ReplyLikeService replyLikeService;

    public ReplyLikeRestController(ReplyLikeService replyLikeService) {
        this.replyLikeService = replyLikeService;
    }

    @PostMapping("/{replyId}/likes")
    public ResponseEntity<Void> likeReply(@AuthenticationPrincipal String email, @PathVariable Long replyId){
        replyLikeService.likeReply(email, replyId);
        return ResponseEntity.noContent().build();
    }
}
