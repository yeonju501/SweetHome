package com.sweet.home.comment.controller;

import com.sweet.home.comment.controller.dto.request.CommentSaveRequest;
import com.sweet.home.comment.controller.dto.response.CommentReplyResponse;
import com.sweet.home.comment.service.CommentService;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<Void> createComment(@AuthenticationPrincipal String email, @PathVariable Long articleId,
        @RequestBody CommentSaveRequest request) {
        commentService.saveComment(email, articleId, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{articleId}/comments")
    public ResponseEntity<List<CommentReplyResponse>> showComments(@PathVariable Long articleId,
        @PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(commentService.findAllByArticle(articleId, pageable));
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Void> updateComment(@AuthenticationPrincipal String email, @PathVariable Long commentId,
        @RequestBody CommentSaveRequest request) {
        commentService.updateComment(email, commentId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@AuthenticationPrincipal String email, @PathVariable Long commentId) {
        commentService.deleteComment(email, commentId);
        return ResponseEntity.noContent().build();
    }
}
