package com.sweet.home.comment.controller;

import com.sweet.home.comment.service.CommentReportService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class CommentReportRestController {

    private final CommentReportService commentReportService;

    public CommentReportRestController(CommentReportService commentReportService) {
        this.commentReportService = commentReportService;
    }

    @PostMapping("/{commentId}/reports")
    public ResponseEntity<Void> reportComment(@AuthenticationPrincipal String email, @PathVariable Long commentId, @RequestBody
        ReportSaveRequest request){
        commentReportService.reportComment(email, commentId, request);
        return ResponseEntity.noContent().build();
    }
}
