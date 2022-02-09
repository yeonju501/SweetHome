package com.sweet.home.article.service;

import com.sweet.home.article.controller.dto.response.ArticlesLikeResponse;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleLike;
import com.sweet.home.article.domain.ArticleLikeRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
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

    @Transactional(readOnly = true)
    public boolean showArticleLikeStatus(String email, Long articleId) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);
        return articleLikeRepository.existsByMemberAndArticle(member, article);
    }

    @Transactional(readOnly = true)
    public ArticlesLikeResponse showArticleLikes(String email, Pageable pageable) {
        Member member = memberService.findByEmail(email);
        Page<ArticleLike> articles = articleLikeRepository.findAllByMember(member, pageable);
        return ArticlesLikeResponse.from(articles);
    }

    @Transactional
    public void deleteLike(String email, Long articleId) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);

        ArticleLike articleLike = articleLikeRepository.findByMemberAndArticle(member, article)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_LIKE_NOT_FOUND));
        articleLike.saveDeletedTime();
    }

    @Transactional
    public void deleteAllByArticle(Long articleId) {
        articleLikeRepository.deleteAllByArticle(articleId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        articleLikeRepository.deleteAllByBoard(boardId);
    }
}