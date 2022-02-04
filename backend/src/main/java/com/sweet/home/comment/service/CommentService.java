package com.sweet.home.comment.service;

import com.sweet.home.article.domain.Article;
import com.sweet.home.article.service.ArticleService;
import com.sweet.home.comment.controller.dto.request.CommentSaveRequest;
import com.sweet.home.comment.controller.dto.request.CommentsDeleteRequest;
import com.sweet.home.comment.controller.dto.response.CommentMineResponse;
import com.sweet.home.comment.controller.dto.response.CommentsMineResponse;
import com.sweet.home.comment.controller.dto.response.CommentsResponse;
import com.sweet.home.comment.domain.Comment;
import com.sweet.home.comment.domain.CommentRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    public CommentService(CommentRepository commentRepository, MemberService memberService,
        ArticleService articleService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.articleService = articleService;
    }

    @Transactional
    public void saveComment(String email, Long articleId, CommentSaveRequest request) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);
        Comment comment = Comment.builder()
            .member(member)
            .article(article)
            .content(request.getContent())
            .build();
        commentRepository.save(comment);
    }

    @Transactional
    public void saveCommentReply(String email, Long articleId, Long commentId, CommentSaveRequest request) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);
        Comment parent = commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID));
        Comment comment = Comment.builder()
            .member(member)
            .article(article)
            .parent(parent)
            .content(request.getContent())
            .build();
        commentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public Comment findById(Long commentId) {
        return commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID));
    }

    @Transactional(readOnly = true)
    public CommentsResponse showCommentsByArticle(Long articleId, Pageable pageable) {
        Article article = articleService.findById(articleId);
        Page<Comment> comments = commentRepository.findAllByParentIsNullAndArticle(article, pageable);
        return CommentsResponse.from(comments);
    }

    @Transactional(readOnly = true)
    public CommentsMineResponse showCommentsByMember(String email, Pageable pageable) {
        Member member = memberService.findByEmail(email);
        Page<Comment> comments = commentRepository.findAllByMember(member, pageable);
        return CommentsMineResponse.from(comments);
    }

    @Transactional
    public void updateComment(String email, Long commentId, CommentSaveRequest request) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID));

        comment.checkCommentByEmail(email);
        comment.changeContent(request.getContent());
    }

    @Transactional
    public void deleteComment(String email, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID));

        comment.checkCommentByEmail(email);
        comment.saveDeletedTime();
    }

    @Transactional
    public void deleteComments(String email, CommentsDeleteRequest request) {
        Member member = memberService.findByEmail(email);
        if (commentRepository.countsCommentsByMemberIdAndIds(request.getIds(), member.getId()) != request.getIds().size()) {
            throw new BusinessException(ErrorCode.COMMENT_NOT_FOUND_BY_ID);
        }
        commentRepository.bulkDeleteComments(request.getIds());
    }
}
