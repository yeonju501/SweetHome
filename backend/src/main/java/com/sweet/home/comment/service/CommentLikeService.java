package com.sweet.home.comment.service;

import com.sweet.home.comment.domain.Comment;
import com.sweet.home.comment.domain.CommentLike;
import com.sweet.home.comment.domain.CommentLikeRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentService commentService;
    private final MemberService memberService;

    public CommentLikeService(CommentLikeRepository commentLikeRepository, CommentService commentService,
        MemberService memberService) {
        this.commentLikeRepository = commentLikeRepository;
        this.commentService = commentService;
        this.memberService = memberService;
    }

    @Transactional
    public void likeComment(String email, Long commentId) {
        Member member = memberService.findByEmail(email);
        Comment comment = commentService.findById(commentId);

        checkNotLiked(member, comment);
        CommentLike commentLike = CommentLike.builder()
            .member(member)
            .comment(comment)
            .build();
        commentLikeRepository.save(commentLike);
    }

    private void checkNotLiked(Member member, Comment comment) {
        if (commentLikeRepository.existsByMemberAndComment(member, comment)) {
            throw new BusinessException(ErrorCode.COMMENT_LIKE_ALREADY_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    public boolean showCommentLikeStatus(String email, Long commentId) {
        Member member = memberService.findByEmail(email);
        Comment comment = commentService.findById(commentId);
        return commentLikeRepository.existsByMemberAndComment(member, comment);
    }

    @Transactional
    public void deleteLike(String email, Long commentId) {
        Member member = memberService.findByEmail(email);
        Comment comment = commentService.findById(commentId);

        CommentLike commentLike = commentLikeRepository.findByMemberAndComment(member, comment)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_LIKE_NOT_FOUND));
        commentLikeRepository.delete(commentLike);
    }

    @Transactional
    public void deleteAllByComment(Long commentId) {
        commentLikeRepository.deleteAllByComment(commentId);
    }

    @Transactional
    public void deleteAllByArticle(Long articleId){
        commentLikeRepository.deleteAllByArticle(articleId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        commentLikeRepository.deleteAllByBoard(boardId);
    }
}
