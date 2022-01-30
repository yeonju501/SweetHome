package com.sweet.home.comment.service;

import com.sweet.home.article.domain.Article;
import com.sweet.home.article.service.ArticleService;
import com.sweet.home.comment.controller.dto.request.CommentSaveRequest;
import com.sweet.home.comment.domain.Comment;
import com.sweet.home.comment.domain.CommentRepository;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;

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
}
