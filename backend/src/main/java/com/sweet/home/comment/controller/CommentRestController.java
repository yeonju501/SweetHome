package com.sweet.home.comment.controller;

import com.sweet.home.comment.controller.dto.request.CommentSaveRequest;
import com.sweet.home.comment.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boards/articles")
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<Void> createComment(@AuthenticationPrincipal String email, @PathVariable Long articleId, @RequestBody CommentSaveRequest request) {
        commentService.saveComment(email, articleId, request);
        return ResponseEntity.noContent().build();
    }
}
