package com.sweet.home.comment.service;

import com.sweet.home.comment.domain.Comment;
import com.sweet.home.comment.domain.CommentReport;
import com.sweet.home.comment.domain.CommentReportRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentReportService {

    private final CommentReportRepository commentReportRepository;
    private final MemberService memberService;
    private final CommentService commentService;

    public CommentReportService(CommentReportRepository commentReportRepository,
        MemberService memberService, CommentService commentService) {
        this.commentReportRepository = commentReportRepository;
        this.memberService = memberService;
        this.commentService = commentService;
    }

    @Transactional
    public void reportComment(String email, Long commentId, ReportSaveRequest request){
        Member member = memberService.findByEmail(email);
        Comment comment = commentService.findById(commentId);

        checkNotReported(member, comment);
        CommentReport commentReport = CommentReport.builder()
            .member(member)
            .comment(comment)
            .content(request.getType() + " " + request.getContent()).build();
        commentReportRepository.save(commentReport);

        comment.checkTotalReports();
    }

    private void checkNotReported(Member member, Comment comment) {
        if(commentReportRepository.existsByMemberAndComment(member, comment)) {
            throw new BusinessException(ErrorCode.COMMENT_REPORT_ALREADY_EXISTS);
        }
    }

    @Transactional
    public void deleteAllByComment(Long commentId) {
        commentReportRepository.deleteAllByComment(commentId);
    }

    @Transactional
    public void deleteAllByArticle(Long articleId) {
        commentReportRepository.deleteAllByArticle(articleId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        commentReportRepository.deleteAllByBoard(boardId);
    }
}
