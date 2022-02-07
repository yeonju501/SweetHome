package com.sweet.home.article.service;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.request.ArticlesDeleteRequest;
import com.sweet.home.article.controller.dto.response.ArticleDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticleReportsResponse;
import com.sweet.home.article.controller.dto.response.ArticlesLikeResponse;
import com.sweet.home.article.controller.dto.response.ArticlesTitleResponse;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleRepository;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.service.BoardService;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberService memberService;
    private final BoardService boardService;

    public ArticleService(ArticleRepository articleRepository, MemberService memberService, BoardService boardService) {
        this.articleRepository = articleRepository;
        this.memberService = memberService;
        this.boardService = boardService;
    }

    @Transactional
    public Long saveArticle(String email, ArticleSaveRequest request, Long boardId) {
        Member member = memberService.findByEmail(email);
        Board board = boardService.findById(boardId);
        Article article = Article.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .member(member)
            .board(board)
            .build();
        return articleRepository.save(article).getId();
    }

    @Transactional(readOnly = true)
    public ArticlesTitleResponse showArticlesByBoard(Long boardId, Pageable pageable) {
        Board board = boardService.findById(boardId);
        Page<Article> articles = articleRepository.findAllByBoard(board, pageable);
        return ArticlesTitleResponse.from(articles);
    }

    @Transactional(readOnly = true)
    public ArticlesLikeResponse showMyArticles(String email, Pageable pageable) {
        Member member = memberService.findByEmail(email);
        Page<Article> articles = articleRepository.findAllByMember(member, pageable);
        return ArticlesLikeResponse.fromArticle(articles);
    }

    @Transactional(readOnly = true)
    public ArticleReportsResponse showBlockedArticles(Pageable pageable) {
        Page<Article> articles = articleRepository.findAllByBlockedAtIsNotNull(pageable);
        return ArticleReportsResponse.from(articles);
    }

    @Transactional(readOnly = true)
    public List<ArticleLikeResponse> showPopularArticles(Pageable pageable) {
        List<Article> articles = articleRepository.findByCreatedAtBetweenOrderByTotalLikesDesc(LocalDateTime.now().minusHours(24), LocalDateTime.now(), pageable);
        return articles.stream()
            .map(ArticleLikeResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Article findById(Long articleId) {
        return articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
    }

    @Transactional(readOnly = true)
    public ArticleDetailResponse showArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
        return ArticleDetailResponse.from(article);
    }

    @Transactional
    public void updateArticle(String email, ArticleSaveRequest request, Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
        article.checkArticleByEmail(email);

        article.changeTitle(request.getTitle());
        article.changeContent(request.getContent());
    }

    @Transactional
    public void deleteArticle(String email, Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
        article.checkArticleByEmail(email);

        article.saveDeletedTime();
    }

    @Transactional
    public void deleteArticles(String email, ArticlesDeleteRequest request) {
        Member member = memberService.findByEmail(email);
        if (articleRepository.countsArticlesByMemberIdAndIds(request.getIds(), member.getId()) != request.getIds().size()) {
            throw new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID);
        }
        articleRepository.bulkDeleteArticles(request.getIds());
    }
}
