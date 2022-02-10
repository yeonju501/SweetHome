package com.sweet.home.comment.service;

import com.sweet.home.comment.domain.Comment;
import com.sweet.home.comment.domain.CommentRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.util.Objects;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentDeleteService {

    private final CommentRepository commentRepository;
    private final CommentLikeService commentLikeService;
    private final CommentReportService commentReportService;

    public CommentDeleteService(CommentRepository commentRepository,
        CommentLikeService commentLikeService, CommentReportService commentReportService) {
        this.commentRepository = commentRepository;
        this.commentLikeService = commentLikeService;
        this.commentReportService = commentReportService;
    }

    @Transactional
    public void cascadeDeleteComment(Long commentId) {
        commentLikeService.deleteAllByComment(commentId);
        commentReportService.deleteAllByComment(commentId);
    }

    @Transactional
    public void deleteAllByArticle(Long articleId){
        commentRepository.deleteAllByArticle(articleId);
        commentLikeService.deleteAllByArticle(articleId);
        commentReportService.deleteAllByArticle(articleId);
    }

    @Transactional
    public void deleteComment(String email, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID));

        comment.checkCommentByEmail(email);

        if (comment.checkParentOrChild() && comment.hasChildList()) {
            comment.removeComment();
            cascadeDeleteComment(commentId);
            return;
        }
        comment.saveDeletedTime();
        if (!comment.checkParentOrChild() && Objects.nonNull(comment.getParent().getIsRemoved()) && !comment.getParent().hasChildList()) {
            comment.getParent().saveDeletedTime();
        }
        cascadeDeleteComment(commentId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        commentRepository.deleteAllByBoard(boardId);
    }
}
