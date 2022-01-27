package com.sweet.home.article.service;

import com.sweet.home.article.controller.dto.request.ArticleSaveRequest;
import com.sweet.home.article.controller.dto.response.ArticleDetailResponse;
import com.sweet.home.article.controller.dto.response.ArticleResponse;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleRepository;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.service.BoardService;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
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
    public List<ArticleResponse> findAllByBoard(Long boardId) {
        Board board = boardService.findById(boardId);
        return articleRepository.findAllByBoard(board).stream()
            .map(ArticleResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ArticleDetailResponse findById(Long articleId) {
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

        articleRepository.save(article);
    }
}
