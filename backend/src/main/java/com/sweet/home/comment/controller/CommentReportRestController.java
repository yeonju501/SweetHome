package com.sweet.home.comment.controller;

import com.sweet.home.comment.controller.dto.response.CommentReportDetailResponse;
import com.sweet.home.comment.controller.dto.response.CommentsReportResponse;
import com.sweet.home.comment.service.CommentDeleteService;
import com.sweet.home.comment.service.CommentReportService;
import com.sweet.home.comment.service.CommentService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CommentReportRestController {

    private final CommentReportService commentReportService;
    private final CommentService commentService;
    private final CommentDeleteService commentDeleteService;

    public CommentReportRestController(CommentReportService commentReportService,
        CommentService commentService, CommentDeleteService commentDeleteService) {
        this.commentReportService = commentReportService;
        this.commentService = commentService;
        this.commentDeleteService = commentDeleteService;
    }

    @PostMapping("/comments/{commentId}/reports")
    public ResponseEntity<Void> reportComment(@AuthenticationPrincipal String email, @PathVariable Long commentId, @RequestBody
        ReportSaveRequest request) {
        commentReportService.reportComment(email, commentId, request);
        commentService.checkReportCounts(commentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/comments/reports")
    public ResponseEntity<CommentsReportResponse> showBlockedComments(
        @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(commentService.showBlockedComments(pageable));
    }

    @GetMapping("/admin/comments/{commentId}/reports")
    public ResponseEntity<List<CommentReportDetailResponse>> showReports(@PathVariable Long commentId) {
        return ResponseEntity.ok().body(commentReportService.showReports(commentId));
    }

    @PostMapping("/admin/comments/{commentId}/reports")
    public ResponseEntity<Void> approveReports(@PathVariable Long commentId) {
        commentDeleteService.cascadeDeleteComment(commentId);
        commentDeleteService.deleteBlockedComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/admin/comments/{commentId}/reports")
    public ResponseEntity<Void> disapproveReports(@PathVariable Long commentId) {
        commentReportService.deleteAllByComment(commentId);
        commentService.unblockComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
