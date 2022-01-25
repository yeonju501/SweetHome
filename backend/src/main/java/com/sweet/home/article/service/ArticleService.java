package com.sweet.home.article.service;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberService memberService;

    public ArticleService(ArticleRepository articleRepository, MemberService memberService) {
        this.articleRepository = articleRepository;
        this.memberService = memberService;
    }

    @Transactional
    public Long saveArticle(String email, ArticleSaveRequest request) {
        Member member = memberService.findByEmail(email);
        // board 로직
        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .member(member)
                .build();
        return articleRepository.save(article).getId();
    }
}
