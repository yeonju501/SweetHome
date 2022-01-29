package com.sweet.home.article.service;

import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleLike;
import com.sweet.home.article.domain.ArticleLikeRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
public class ArticleLikeService {

    private final ArticleLikeRepository articleLikeRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    public ArticleLikeService(ArticleLikeRepository articleLikeRepository, MemberService memberService,
        ArticleService articleService) {
        this.articleLikeRepository = articleLikeRepository;
        this.memberService = memberService;
        this.articleService = articleService;
    }

    public void likeArticle(String email, Long articleId) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);

        checkNotLiked(member, article);
        ArticleLike articleLike = ArticleLike.builder()
            .member(member)
            .article(article)
            .build();
        articleLikeRepository.save(articleLike);
    }

    private void checkNotLiked(Member member, Article article) {
        if (articleLikeRepository.existsByMemberAndArticle(member, article)) {
            throw new BusinessException(ErrorCode.ARTICLE_LIKE_ALREADY_EXISTS);
        }
    }

    public void deleteLike(String email, Long articleId) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);

        ArticleLike articleLike = articleLikeRepository.findByMemberAndArticle(member, article)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_LIKE_NOT_FOUND));
        articleLikeRepository.delete(articleLike);
    }
}